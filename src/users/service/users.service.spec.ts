import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { IUserData, IUserRegisterData } from "../interfaces/user.interface";
import { Role } from "src/constants/role.enum";


describe("UsersService", () => {
    let service: UsersService;
    
    const mockUserRepository = {
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn()
    }

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockUserRepository
                }
            ]
        }).compile();

        service = module.get<UsersService>(UsersService);
    })

    it("should be defined", () => {
        expect(service).toBeDefined();
    })

    it("findOne => should find a user by username", async () => {
        // assert
        const serviceInput = "erfanbahramnia"

        const repositoryInput = {
            username: "erfanbahramnia"
        }

        const user: IUserData = {
            first_name: "erfan",
            last_name: "bahramnia",
            username: "erfanbahramnia",
            mobile: "09229571721",
            password: "fadhflhalsdf",
            role: Role.user,
            salt: "fadsf",
            userId: 1,
        }

        jest.spyOn(mockUserRepository, "findOneBy").mockReturnValue(user)

        // act
        const result = await service.findOne(serviceInput);

        // assert
        expect(mockUserRepository.findOneBy).toHaveBeenCalled();
        expect(mockUserRepository.findOneBy).toHaveBeenCalledWith(repositoryInput);

        expect(result).toEqual(user);
    })

    it("register => should create new user", async () => {
        // arrange
        const userData: IUserRegisterData = {
            first_name: "erfan",
            last_name: "bahramnia",
            username: "erfanbahramnia",
            mobile: "09229571721",
            password: "fadhflhalsdf",
            salt: "fadsf",
        };

        const user: IUserData = {
            first_name: "erfan",
            last_name: "bahramnia",
            username: "erfanbahramnia",
            mobile: "09229571721",
            password: "fadhflhalsdf",
            role: Role.user,
            salt: "fadsf",
            userId: 1,
        }

        jest.spyOn(mockUserRepository, "create").mockReturnValue(userData);
        jest.spyOn(mockUserRepository, "save").mockReturnValue(user);

        // act
        const result = await service.register(userData);

        // assert
        expect(mockUserRepository.create).toHaveBeenCalled();
        expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
        expect(mockUserRepository.save).toHaveBeenCalled();
        expect(mockUserRepository.save).toHaveBeenCalledWith(userData);

        expect(result).toEqual(user);
    })
})
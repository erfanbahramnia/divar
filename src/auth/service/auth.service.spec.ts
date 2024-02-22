import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service"
import { UsersService } from "src/users/service/users.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { IUserData } from "src/users/interfaces/user.interface";
import { generateSalt } from "src/utils/bcrypt";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/constants/role.enum";

describe("AuthService", () => {
    let authService: AuthService;
    let jwtService: JwtService;
    let userService: UsersService;
    let configService: ConfigService;

    const mockUserRepository = {
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn()
    };

    const mockConfigService = {
        get: jest.fn((key: string) => {
            if(key === "secretKey") {
                return "secretKey";
            }
            return null
        })
    }

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule
            ],
            providers: [
                {
                    provide: ConfigService,
                    useValue: mockConfigService
                },
                AuthService,
                UsersService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: mockUserRepository
                },
                JwtService
            ]
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UsersService>(UsersService);
        configService = module.get<ConfigService>(ConfigService)
    })

    it("should be defined", async() => {
        expect(authService).toBeDefined()
    });

    it("Post => user login successfully", async () => {
        // arrange
        const username = "string";

        const password = "string";

        const user: IUserData = {
            username: "string",
            password: "$2b$10$HWrwPflpaYROOt9tov/SiOixELA6PaiQZLMbV3y8VpbC81Hud6OFO",
            first_name: "string",
            last_name: "string",
            mobile: "09229571721",
            role: Role.user,
            salt: "$2b$10$HWrwPflpaYROOt9tov/SiO",
            userId: 2
        }

        jest.spyOn(mockUserRepository, "findOneBy").mockReturnValue(user)
        jest.spyOn(userService, "findOne").mockResolvedValue(user)
        
        // act
        const result = await authService.login(username, password)
        let isToken = ((typeof result.access_token === "string") && (result.access_token.length > 0)) ? true : false

        // assert
        expect(userService.findOne).toHaveBeenCalled();
        expect(userService.findOne).toHaveBeenCalledWith(username);
        expect(isToken).toEqual(true);
    })

    it("Post => user password does not match", async () => {
        // arrange
        const username = "string";

        const password = "string2";

        const user: IUserData = {
            username: "string",
            password: "$2b$10$HWrwPflpaYROOt9tov/SiOixELA6PaiQZLMbV3y8VpbC81Hud6OFO",
            first_name: "string",
            last_name: "string",
            mobile: "09229571721",
            role: Role.user,
            salt: "$2b$10$HWrwPflpaYROOt9tov/SiO",
            userId: 2
        }

        jest.spyOn(mockUserRepository, "findOneBy").mockReturnValue(user)
        jest.spyOn(userService, "findOne").mockResolvedValue(user)
        
        // act
        const result = async() => {
            await authService.login(username, password)
        }
        
        // assert
        expect(result).rejects.toThrow(UnauthorizedException)
    })

    it("Post => user not found", () => {
        // arrange
        const username = "stringfasdf";
        const password = "string";

        const user = undefined

        jest.spyOn(mockUserRepository, "findOneBy").mockReturnValue(user)
        jest.spyOn(userService, "findOne").mockResolvedValue(user)
        
        // act
        const result = async() => {
            await authService.login(username, password)
        }
        
        // assert
        expect(result).rejects.toThrow(NotFoundException)
    })
})
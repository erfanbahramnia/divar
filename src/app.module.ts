import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { DeveloperModule } from './developer/developer.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        AuthModule, 
        UsersModule,
        AdminModule,
        DeveloperModule, 
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            global: true
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: 'erfan.81',
            database: 'test',
            entities: [UserEntity],
            synchronize: true,
        })
    ]
})
export class AppModule {}

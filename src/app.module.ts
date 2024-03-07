// nestjs
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// db
import { TypeOrmModule } from '@nestjs/typeorm';
// modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { DeveloperModule } from './developer/developer.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { ProductEntity } from './product/entities/product.entity';
import { CategoryEntity } from './category/entities/category.entity';
import { ProductPropertyEntity } from './product/entities/productProperty.entity';
import { ProductModule } from './product/product.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        // App Modules
        AuthModule, 
        UsersModule,
        AdminModule,
        DeveloperModule,
        CategoryModule,
        ProductModule,
        // Config Modules
        ThrottlerModule.forRoot([
            {
                name: "short",
                ttl: 1000,
                limit: 3
            },
            {
                name: "medium",
                ttl: 10000,
                limit: 20
            },
            {
                name: "long",
                ttl: 60000,
                limit: 100
            }
        ]),
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
            entities: [
                UserEntity,
                CategoryEntity,
                ProductEntity,
                ProductPropertyEntity
            ],
            synchronize: true,
            autoLoadEntities: true
        })
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}

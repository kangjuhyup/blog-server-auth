import { Module } from '@nestjs/common';
import { UserModule } from '@database/user/user.module';
import { databaseProviders } from './database.provider';

@Module({
    providers : [
        ...databaseProviders
    ],
    imports : [
        UserModule
    ],
    exports : [
        UserModule
    ]
})
export class DatabaseModule {}

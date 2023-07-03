import { Module } from "@nestjs/common";
import { UserRepository } from "@database/user/user.repository";
import { UserProvider } from "@database/user/user.provider";
import { databaseProviders } from "../database.provider";

@Module({
    providers: [
        ...databaseProviders,
        UserRepository,
        ...UserProvider,
    ],
    exports : [
        UserRepository,
        ...UserProvider,
    ]
  })
  export class UserModule {}
  
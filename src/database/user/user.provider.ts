import { DataSource } from "typeorm";
import { UserInfo } from "@root/database/user/user.entity";

export const UserProvider = [
    {
        provide : 'USER_REPOSITORY',
        useFactory : (ds:DataSource) => ds.getRepository(UserInfo),
        inject : ['DATA_SOURCE'],
    }
]
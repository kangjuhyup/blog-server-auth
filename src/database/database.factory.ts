import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user/user.repository";

@Injectable()
export class DatabaseFactory {
    constructor(
        private readonly _userRepository : UserRepository
    ){}

    get userRepository() : UserRepository { return this._userRepository };
}
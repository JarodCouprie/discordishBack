import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./users.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
    }

    async create(createdUserDto: any): Promise<User> {
        createdUserDto.password = await bcrypt.hash(createdUserDto.password, 10);
        const createUser = new this.userModel(createdUserDto);
        return createUser.save();
    }


    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findAllFromServer(serverId: string): Promise<User[]> {
        return this.userModel.find({
            servers: {$in: serverId}
        });
    }

    async getByEmailAndClearPassword(email: string, password: string) {
        const user = await this.userModel.findOne({email});
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
    }

    async joinServer(
        email: string,
        idServer: number,
    ): Promise<User> {
        const user = await this.userModel.findOneAndUpdate(
            {email: email},
            {$addToSet: {servers: idServer}},
            {new: true},
        );

        return user;
    }
}

import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Message, MessageDocument} from "./message.schema";
import {User, UserDocument} from "../users/users.schema";

@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
    }

    async getByChannelId(channelId: string): Promise<Message[]> {
        return this.messageModel.find({channelId}).populate({
            path: "user", select: {
                avatarUrl: 1,
                firstname: 1,
                lastname: 1,
            }
        })
    }

    async create(createMessageDto: any, email: string): Promise<Message> {
        const user = await this.userModel.findOne({email})
        if (!user) return Promise.reject();
        createMessageDto.user = user._id;
        createMessageDto.createdAt = Date.now();
        const createdChannel = new this.messageModel(createMessageDto);
        return createdChannel.save();
    }
}

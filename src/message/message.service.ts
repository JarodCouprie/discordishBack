import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Message, MessageDocument} from "./message.schema";
import {User, UserDocument} from "../users/users.schema";
import {Serveur, ServeurDocument} from "../server/serveur.schema";
import {Channel, ChannelDocument} from "../channel/channel.schema";

@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
        @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
    ) {
    }

    async getByChannelId(channelId: string, email: string): Promise<Message[]> {
        const user = await this.userModel.findOne({email});
        const channel = await this.channelModel.findOne({_id: channelId});
        const server = await this.serveurModel.findOne({_id: channel.serverId});

        if (server.usersBlocked.find(value => value === user._id.toString())) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

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
        if (!user) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        const channel = await this.channelModel.findOne({_id: createMessageDto.channelId});
        const server = await this.serveurModel.findOne({_id: channel.serverId});

        if (server.usersBlocked.find(value => value === user._id.toString())) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        createMessageDto.user = user._id;
        createMessageDto.createdAt = Date.now();
        const createdChannel = new this.messageModel(createMessageDto);
        return createdChannel.save();
    }
}

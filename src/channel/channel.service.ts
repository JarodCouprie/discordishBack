import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Channel, ChannelDocument} from "./channel.schema";
import {Model} from "mongoose";
import {Serveur, ServeurDocument} from "../server/serveur.schema";
import {User, UserDocument} from "../users/users.schema";

@Injectable()
export class ChannelService {
    constructor(
        @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
    ) {
    }

    async getByServerId(serverId: string, email: string): Promise<Channel[]> {
        const user = await this.userModel.findOne({email});
        const server = await this.serveurModel.findOne({_id: serverId});

        if (server.usersBlocked.find(value => value === user._id.toString())) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        return this.channelModel.find({serverId});
    }

    async create(createChannelDto: any, email: string): Promise<Channel> {
        const user = await this.userModel.findOne({email});
        const server = await this.serveurModel.findOne({_id: createChannelDto.serverId});

        if (server.usersBlocked.find(value => value === user._id.toString())) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const createdChannel = new this.channelModel(createChannelDto);
        return createdChannel.save();
    }

}


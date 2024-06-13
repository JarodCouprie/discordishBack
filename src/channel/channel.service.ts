import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Channel, ChannelDocument} from "./channel.schema";
import {Model} from "mongoose";

@Injectable()
export class ChannelService {
    constructor(
        @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>
    ) {
    }

    async getByServerId(serverId: string): Promise<Channel[]> {
        return this.channelModel.find({serverId});
    }

    async create(createChannelDto: any): Promise<Channel> {
        const createdChannel = new this.channelModel(createChannelDto);
        return createdChannel.save();
    }

}


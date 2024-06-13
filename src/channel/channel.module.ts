import {Module} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {ChannelController} from './channel.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Channel, ChannelSchema} from "./channel.schema";

@Module({
    controllers: [ChannelController],
    providers: [ChannelService],
    imports: [
        MongooseModule.forFeature([{name: Channel.name, schema: ChannelSchema}])
    ]
})
export class ChannelModule {
}

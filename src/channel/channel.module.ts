import {Module} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {ChannelController} from './channel.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Channel, ChannelSchema} from "./channel.schema";
import {User, UserSchema} from "../users/users.schema";
import {Serveur, ServeurSchema} from "../server/serveur.schema";

@Module({
    controllers: [ChannelController],
    providers: [ChannelService],
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }, {name: Serveur.name, schema: ServeurSchema}, {name: Channel.name, schema: ChannelSchema}])
    ]
})
export class ChannelModule {
}

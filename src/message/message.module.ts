import {Module} from '@nestjs/common';
import {MessageService} from './message.service';
import {MessageController} from './message.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Message, MessageSchema} from "./message.schema";
import {User, UserSchema} from "../users/users.schema";
import {Serveur, ServeurSchema} from "../server/serveur.schema";
import {Channel, ChannelSchema} from "../channel/channel.schema";

@Module({
    controllers: [MessageController],
    providers: [MessageService],
    imports: [
        MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}, {
            name: User.name,
            schema: UserSchema
        }, {name: Serveur.name, schema: ServeurSchema}, {name: Channel.name, schema: ChannelSchema}])
    ]
})
export class MessageModule {
}

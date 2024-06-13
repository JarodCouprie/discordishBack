import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ServerModule} from "./server/server.module";
import {UsersModule} from './users/users.module';
import {JwtModule} from "@nestjs/jwt";
import {ChannelModule} from './channel/channel.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [
        MongooseModule.forRoot("mongodb://localhost/discordish"),
        ServerModule,
        UsersModule,
        ChannelModule,
        JwtModule.register({
            global: true,
            secret: "azerty"
        }),
        MessageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

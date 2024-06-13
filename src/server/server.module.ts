import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Serveur, ServeurSchema} from './serveur.schema';
import {ServeurController} from './serveur.controller';
import {ServeurService} from './serveur.service';
import {User, UserSchema} from "../users/users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Serveur.name, schema: ServeurSchema}, {name: User.name, schema: UserSchema}]),
    ],
    providers: [ServeurService],
    controllers: [ServeurController],
})
export class ServerModule {
}

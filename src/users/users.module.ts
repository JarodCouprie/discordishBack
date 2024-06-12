import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./users.schema";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.register({
            global: true,
            secret: "azerty"
        })
    ]
})
export class UsersModule {
}

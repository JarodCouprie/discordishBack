import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Serveur} from "../server/serveur.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true})
    firstname: string;

    @Prop({required: true})
    lastname: string;

    @Prop({required: true, minlength: 3, maxlength: 50})
    email: string;

    @Prop({maxlength: 100})
    password: string;

    @Prop()
    avatarUrl: string;

    @Prop()
    servers: Serveur[];

    @Prop()
    serversBlackList: Serveur[];

}

export const UserSchema = SchemaFactory.createForClass(User);

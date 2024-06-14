import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {User} from "../users/users.schema";

export type ServeurDocument = Serveur & Document;

@Schema()
export class Serveur {
    @Prop({required: true, minlength: 3, maxlength: 50})
    name: string;

    @Prop({maxlength: 100})
    description: string;

    @Prop()
    public: boolean;

    @Prop()
    urlLogo: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    createdBy: User;

    @Prop()
    usersBlocked: string[];

}

export const ServeurSchema = SchemaFactory.createForClass(Serveur);

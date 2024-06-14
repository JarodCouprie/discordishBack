import {Document, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../users/users.schema";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({required: true})
    content: string;

    @Prop({required: true})
    channelId: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({default: Date.now()})
    createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
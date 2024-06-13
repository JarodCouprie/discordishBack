import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    serverId: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
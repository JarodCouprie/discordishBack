import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

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
}

export const ServeurSchema = SchemaFactory.createForClass(Serveur);

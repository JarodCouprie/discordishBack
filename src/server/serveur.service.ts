// src/cats/cats.service.ts
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Serveur, ServeurDocument} from './serveur.schema';
import {User, UserDocument} from "../users/users.schema";

@Injectable()
export class ServeurService {
    constructor(
        @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
    }

    async create(createdServeurDto: any, email: string): Promise<Serveur> {
        const user = await this.userModel.findOne({email})
        if (!user) return Promise.reject();
        createdServeurDto.createdBy = user._id;
        const createdServeur = new this.serveurModel(createdServeurDto);
        return createdServeur.save();
    }

    async findAll(): Promise<Serveur[]> {
        return this.serveurModel.find().exec();
    }

    async findAllServerOfUser(email: string): Promise<Serveur[]> {
        const user = await this.userModel.findOne({email});

        return this.serveurModel.find({
            _id: {$in: user.servers},
        });
    }

    async blockUser(senderEmail: string, serverId: string, userId: string): Promise<Serveur> {
        const user = await this.userModel.findOne({email: senderEmail});
        const server = await this.serveurModel.findOne({
            _id: serverId
        });

        if (user._id.toString() !== server.createdBy.toString()) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        return this.serveurModel.findOneAndUpdate(
            {_id: serverId},
            {$addToSet: {usersBlocked: userId}},
            {new: true}
        )
    }

    async unblockUser(senderEmail: string, serverId: string, userId: string): Promise<Serveur> {
        const user = await this.userModel.findOne({email: senderEmail});
        const server = await this.serveurModel.findOne({
            _id: serverId
        });

        if (user._id.toString() !== server.createdBy.toString()) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        return this.serveurModel.findOneAndUpdate(
            {_id: serverId},
            {$pull: {usersBlocked: userId}},
            {new: true}
        )
    }

    async findAllPublic(): Promise<Serveur[]> {
        return this.serveurModel.find({public: true}).exec();
    }
}

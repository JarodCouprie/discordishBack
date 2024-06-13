import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {MessageService} from './message.service';
import {AuthGuard} from "../auth.guard";

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {
    }

    @UseGuards(AuthGuard)
    @Get("/getByChannelId/:id")
    async getByChannelId(@Param("id") id: string) {
        return await this.messageService.getByChannelId(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Request() requete, @Body() createMessageDto: any) {
        const email = requete.user.sub;
        return this.messageService.create(createMessageDto, email);
    }


}

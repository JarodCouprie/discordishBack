import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {MessageService} from './message.service';
import {AuthGuard} from "../auth.guard";

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {
    }

    @UseGuards(AuthGuard)
    @Get("/getByChannelId/:id")
    async getByChannelId(@Param("id") id: string, @Request() request: any) {
        const email = request.user.sub;
        return await this.messageService.getByChannelId(id, email);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Request() request: any, @Body() createMessageDto: any) {
        const email = request.user.sub;
        return this.messageService.create(createMessageDto, email);
    }

}

import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {AuthGuard} from "../auth.guard";

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {
    }

    @UseGuards(AuthGuard)
    @Get("/getByServerId/:id")
    async getByServerId(@Param("id") id: string, @Request() request: any) {
        const email = request.user.sub;
        return await this.channelService.getByServerId(id, email);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createChannelDto: any, @Request() request: any) {
        const email = request.user.sub;
        return this.channelService.create(createChannelDto, email);
    }


}

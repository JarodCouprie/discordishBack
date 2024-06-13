import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ChannelService} from './channel.service';
import {AuthGuard} from "../auth.guard";

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {
    }


    @UseGuards(AuthGuard)
    @Get("/getByServerId/:id")
    async getByServerId(@Param("id") id: string) {
        return await this.channelService.getByServerId(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createChannelDto: any) {
        return this.channelService.create(createChannelDto);
    }


}

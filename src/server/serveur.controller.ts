import {Body, Controller, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {ServeurService} from './serveur.service';
import {AuthGuard} from "../auth.guard";

@Controller('server')
export class ServeurController {
    constructor(private readonly serverService: ServeurService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() request: any) {
        const email = request.user.sub;
        return this.serverService.findAllPublic(email);
    }

    @Get('/own')
    @UseGuards(AuthGuard)
    findAllServerOfUser(@Request() request: any) {
        const email = request.user.sub;
        return this.serverService.findAllServerOfUser(email);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createServerDto: any, @Request() request: any) {
        const email = request.user.sub;
        return this.serverService.create(createServerDto, email);
    }

    @UseGuards(AuthGuard)
    @Put("/block/:id")
    async blockUser(@Param("id") serverId: string, @Body() blockUser: any, @Request() request: any) {
        const email = request.user.sub;
        return this.serverService.blockUser(email, serverId, blockUser.userId);
    }

    @UseGuards(AuthGuard)
    @Put("/unblock/:id")
    async unblockUser(@Param("id") serverId: string, @Body() unblockUser: any, @Request() request: any) {
        const email = request.user.sub;
        return this.serverService.unblockUser(email, serverId, unblockUser.userId);
    }

}

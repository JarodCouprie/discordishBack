import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {ServeurService} from './serveur.service';
import {AuthGuard} from "../auth.guard";

@Controller('server')
export class ServeurController {
    constructor(private readonly serverService: ServeurService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.serverService.findAllPublic();
    }

    @Get('/own')
    @UseGuards(AuthGuard)
    findAllServerOfUser(@Request() request: any) {
        return this.serverService.findAllServerOfUser(request.user.sub);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createServerDto: any, @Request() request: any) {
        const email = request.user.sub;
        return this.serverService.create(createServerDto, email);
    }


}

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

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createServerDto: any) {
        return this.serverService.create(createServerDto);
    }
}

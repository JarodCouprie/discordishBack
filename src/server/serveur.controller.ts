import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {ServeurService} from './serveur.service';
import {AuthGuard} from "../auth.guard";

@Controller('server')
export class ServeurController {
    constructor(private readonly serveurService: ServeurService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() request) {
        console.log(request.user.sub);
        return this.serveurService.findAllPublic();
    }

    @Post()
    async create(@Body() createServeurDto: any) {
        return this.serveurService.create(createServeurDto);
    }
}

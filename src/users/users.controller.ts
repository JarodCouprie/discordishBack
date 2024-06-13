import {Body, Controller, Get, Post, UseGuards, Request, Param} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "../auth.guard";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get("/server/:id")
    @UseGuards(AuthGuard)
    async findAllFromServer(@Param("id") id: string) {
        return this.usersService.findAllFromServer(id);
    }

    @Post("register")
    async create(@Body() createUserDto: any) {
        return this.usersService.create(createUserDto);
    }

    @Post("login")
    async login(@Body() userDto: any) {
        const user = await this.usersService.getByEmailAndClearPassword(userDto.email, userDto.password)
        const payload = {
            sub: user.email
        }
        const jwt = await this.jwtService.signAsync(payload);
        return {jwt};
    }

    @Post('join-server')
    @UseGuards(AuthGuard)
    async rejoindreServeur(
        @Body() joinServerDto: any,
        @Request() requete,
    ) {
        const email = requete.user.sub;

        return this.usersService.joinServer(
            email,
            joinServerDto._id,
        );
    }

}

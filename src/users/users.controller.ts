import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {JwtService} from "@nestjs/jwt";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
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

}

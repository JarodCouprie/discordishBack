import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
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
    async login(@Body() createUserDto: any) {
        console.log(createUserDto)
        return '{"jwt": "super jwt"}';
    }

}

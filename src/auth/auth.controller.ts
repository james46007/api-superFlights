import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Autentication')
@Controller('api/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Req() req) {
        return await this.authService.signIn(req.user);
    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO) {
        return await this.authService.signUp(userDTO);
    }

}

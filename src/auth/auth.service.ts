import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        const isValidPassword = await this.userService.checkPassword(password, user.password);

        if (user && isValidPassword) return user;

        return null;
    }

    // Metodo ingreso
    async signIn(user: any) {
        const payLoad = {
            username: user.username,
            sub: user._id
        }

        return { access_token: this.jwtService.sign(payLoad) }
    }

    // Metodo registrar
    async signUp(userDTO: UserDTO){
        return this.userService.create(userDTO);
    }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/inputs/login.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly UsersService: UsersService,
    ) { }

    async signup(signupInput: SignupInput): Promise<AuthResponse> {

        const user = await this.UsersService.create(signupInput)
        const token = 'ABC123';

        return { token, user }
    }

    async login(loginInput: LoginInput): Promise<AuthResponse> {

        const { email, password } = loginInput;
        const token = 'ABC123';
        const user = await this.UsersService.findOneByEmail( email )

        if( !bcrypt.compareSync( password, user.password) ){
            throw new BadRequestException('Email / Password do not match')
        }

        // TODO: Token 
        return {
            token, 
            user
        }

    }

}

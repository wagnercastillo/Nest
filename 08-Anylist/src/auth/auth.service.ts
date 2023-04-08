import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly UsersService: UsersService,
    ){}

    async signup( signupInput: SignupInput): Promise<AuthResponse>{

        const user = await this.UsersService.create( signupInput )
        const token = 'ABC123';

        return { token, user}


    }

}

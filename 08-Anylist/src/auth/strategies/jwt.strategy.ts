import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { User } from "../../users/entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(

        private readonly authService: AuthService,
        
        configService: ConfigService
    ){

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })

    }

    async validate( payload: JwtPayload ): Promise<User>{

        const user = await this.authService.validateUser( payload.id );
        return user
        
    }

}
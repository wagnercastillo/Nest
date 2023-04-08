import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type';
import { SignupInput } from './dto/inputs/signup.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginInput } from './dto/inputs';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  
  constructor(
    private readonly authService: AuthService
  ){}

  @Mutation( () => AuthResponse ,{ name: 'signup'})
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse>{
    return this.authService.signup( signupInput )
  }

  @Mutation( () => AuthResponse ,{ name: 'login'})
  async login(
    @Args('loginInput') loginInput: LoginInput
  ):Promise<AuthResponse>{
    return this.authService.login(loginInput);
  }

  @Query( () => AuthResponse,{ name: 'revalite'})
  @UseGuards( JwtAuthGuard )
  revalidateToken(
     
  ):AuthResponse{

    throw new Error('No implementado')
    // return this.authService.revalidateToken()
  }
  

}
0
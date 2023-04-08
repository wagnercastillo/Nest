import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput } from './dto/inputs';

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

  // @Query( ,{ name: 'revalite'})
  // async revalidateToken(){
  //   return this.authService.revalidateToken()
  // }
  

}
0
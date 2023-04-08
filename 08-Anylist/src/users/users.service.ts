import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UsersService')
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}
  
  async create(signupInput: SignupInput): Promise<User> {
    try {
      
      const newUser = this.usersRepository.create( {
        ...signupInput, 
        password: bcrypt.hashSync( signupInput.password, 10)
      } )

      return await this.usersRepository.save( newUser )

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error (`findOne not implemented`);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error (`block not implemented`);
  }

  private handleDBErrors( error: any ): never {

    if( error.code ='23505'){
      throw new BadRequestException(error.detail.replace('Key', ''))
    }

    this.logger.error( error );
    throw new InternalServerErrorException('Please check server logs');
  }
  
}



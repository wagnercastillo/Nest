import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';

@Entity( { name: 'lists'})
@ObjectType()
export class List {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID)
  id: string;

  @Column()
  @Field( () => String )
  @IsOptional()
  name: string;

  @ManyToOne( () => User, (user) => user.lists, { nullable: false, lazy: true }) 
  @Index('userId-listIndex')
  @Field( () => User, { nullable: true } )
  user: User;
  
  
}

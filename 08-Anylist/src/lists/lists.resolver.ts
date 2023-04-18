import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ListsService } from './lists.service';
import { User } from '../users/entities/user.entity';
import { List } from './entities/list.entity';

import { CreateListInput, UpdateListInput } from './dto';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { ListItem } from '../list-item/entities/list-item.entity';
import { ListItemService } from '../list-item/list-item.service';

@Resolver(() => List)
@UseGuards( JwtAuthGuard )
export class ListsResolver {

  constructor(

    private readonly listsService: ListsService,
    private readonly listItemService: ListItemService
    
  ) {}

  @Mutation(() => List, { name: 'createList'})
  async createList(
    @Args('createListInput') createListInput: CreateListInput, 
    @CurrentUser() user: User,
  ):Promise<List>{
    return this.listsService.create(createListInput, user);
  }


  @Query(() => [List], { name: 'lists' })
  async findAll(
    @CurrentUser() user: User,
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<List[]> {
    return this.listsService.findAll( user, paginationArgs, searchArgs);
  }

  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ):Promise<List>{
    return this.listsService.findOne(id, user);
  }

  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User
  ):Promise<List>{
    return this.listsService.update(updateListInput.id, updateListInput, user);
  }

  @Mutation(() => List)
  removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User
  ):Promise<List>{
    return this.listsService.remove(id, user);
  }

  @ResolveField( () => [ListItem], { name: 'items' })
  async getListItems(
    @Parent() list: List,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<ListItem[]> {

    return  this.listItemService.findAll( list, paginationArgs, searchArgs );
  }

  @ResolveField( () => Int, { name: 'totalItems'} )
  async countListItemByList(
    @Parent() list: List,
  ):Promise<number>{
    return this.listItemService.countListItemByList( list )
  }


 

}
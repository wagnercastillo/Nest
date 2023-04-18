import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { ListItemService } from './list-item.service';
import { ListItem } from './entities/list-item.entity';

import { CreateListItemInput, UpdateListItemInput } from './dto';

@Resolver(() => ListItem)
@UseGuards( JwtAuthGuard )
export class ListItemResolver {
  constructor(private readonly listItemService: ListItemService) {}

  @Mutation(() => ListItem)
  createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput
  ): Promise<ListItem>{
    return this.listItemService.create(createListItemInput);
  }

  // @Query(() => [ListItem], { name: 'listItem' })
  // findAll() {
  //   return this.listItemService.findAll();
  // }

  @Query(() => ListItem, { name: 'listItem' })
  findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string
  ): Promise<ListItem>{
    return this.listItemService.findOne(id);
  }

  @Mutation(() => ListItem)
  updateListItem(
    @Args('updateListItemInput') updateListItemInput: UpdateListItemInput
  ): Promise<ListItem>{
    return this.listItemService.update(updateListItemInput.id, updateListItemInput);
  }

  // @Mutation(() => ListItem)
  // removeListItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.remove(id);
  // }
}

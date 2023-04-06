import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType({ description: 'Todo quick aggregation' })
export class AggregationType {

    @Field( () => Int )
    total: number;

    @Field( () => Int )
    pending: number;

    @Field( () => Int )
    completed: number;

    @Field( () => Int, { deprecationReason: 'Most use completed instead'} )
    totalTodosCompleted: number;



}
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field()
  ID!: number;

  @Field()
  Name!: string;

  @Field({ nullable: true })
  MiddleName?: string;

  @Field({ nullable: true })
  LastName!: string;

  @Field()
  Dni!: string;

  @Field({ defaultValue: false })
  Adult!: boolean;

  @Field()
  Password!: string;
}

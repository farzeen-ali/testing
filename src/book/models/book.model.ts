import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Book extends Document {
  @Field(() => ID)
  declare readonly _id: string; // ✅ FIX applied here

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop({ required: true })
  @Field()
  author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

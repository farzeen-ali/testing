import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './models/book.model';
import { BookService } from './book.service';
import { BookResolver } from './resolvers/book.resolver';


@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  providers: [BookResolver, BookService],
})
export class BookModule {}
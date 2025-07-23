import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  // ✅ Get all books
  @Query(() => [Book], { name: 'getAllBooks' })
  async findAll() {
    return this.bookService.findAll();
  }

  // ✅ Get single book by ID
  @Query(() => Book, { name: 'getBook' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findOne(id);
  }

  // ✅ Create new book
  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

  // ✅ Update book by ID
@Mutation(() => Book)
async updateBook(@Args('input') input: UpdateBookInput) {
  return this.bookService.update(input);
}

  // ✅ Delete book by ID
  @Mutation(() => Boolean)
  async deleteBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}

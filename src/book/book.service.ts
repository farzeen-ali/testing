import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './models/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(input: CreateBookInput): Promise<Book> {
    const created = new this.bookModel(input);
    return created.save();
  }
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(input: UpdateBookInput): Promise<Book> {
  const existingBook = await this.bookModel.findById(input.id);
  if (!existingBook) {
    throw new Error('Book not found');
  }
  Object.assign(existingBook, input);
  return existingBook.save();
}


  async remove(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Book not found');
    return true;
  }
}
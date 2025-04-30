import { Injectable } from '@angular/core';
import { Book } from 'models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private storageKey = 'books';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getBooks(): Book[] {
    const books = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    return books.map((b: any) => ({
      ...b,
      published: new Date(b.published),
      added: new Date(b.added)
    }));
  }

  addBook(book: Book): void {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }
}

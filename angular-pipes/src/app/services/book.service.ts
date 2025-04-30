import { Injectable } from '@angular/core';
import { Book } from 'models/book.model';
import { delay, map, Observable, of } from 'rxjs';

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

  getBooks(): Observable<Book[]> {
    const books = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    return of(books).pipe(
      delay(10000),
      map((books: Book[]) =>
        books.map((book: Book) => ({
          ...book,
          published: new Date(book.published),
          added: new Date(book.added!)
        }))
      )
    );
  }

  addBook(book: Book): void {
    this.getBooks().subscribe((books: Book[]) => {
      books.push(book);
      localStorage.setItem(this.storageKey, JSON.stringify(books));
    });
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Book } from 'models/book.model';

@Pipe({
  name: 'bookSearch'
})
export class BookSearchPipe implements PipeTransform {
  transform(books: Book[], searchTerm: string = ''): Book[] {
    if (!books || !searchTerm.trim()) return books;

    const term = searchTerm.toLowerCase();

    return books.filter(book =>
      Object.values(book).some(value =>
        value &&
        value.toString().toLowerCase().includes(term)
      )
    );
  }
}

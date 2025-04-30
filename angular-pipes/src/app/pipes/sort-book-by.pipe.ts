import { Pipe, PipeTransform } from '@angular/core';
import { Book } from 'models/book.model';

@Pipe({
  name: 'sortBookBy'
})
export class SortBookByPipe implements PipeTransform {

  transform(books: Book[], sortBy: string): Book[] {
    if (!books || books.length === 0) {
      return [];
    }

    if (sortBy === 'title') {
      return books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'author') {
      return books.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === 'date') {
      return books.sort((a, b) => new Date(a.added!).getTime() - new Date(b.added!).getTime());
    } else if (sortBy === 'rating') {
      return books.sort((a, b) => b.rating - a.rating);
    } else {
      return books;
    }
  }

}

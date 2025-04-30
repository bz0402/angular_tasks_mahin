import { Component, OnInit } from '@angular/core';
import { Book } from 'models/book.model';
import { Observable, of, tap } from 'rxjs';
import { BookService } from 'src/app/services/book.service'; // adjust path if needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  sortBy = 'title';
  books$!: Observable<Book[]>;
  isLoading: boolean = true;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books$ = this.bookService.getBooks().pipe(
      tap(() => this.isLoading = false)
    );
  }

  onBookAdded(newBook: Book) {
    this.bookService.addBook(newBook);
    this.books$ = this.bookService.getBooks();
  }
}

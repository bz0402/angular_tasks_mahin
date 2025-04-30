import { Component, OnInit } from '@angular/core';
import { Book } from 'models/book.model';
import { BookService } from 'src/app/services/book.service'; // adjust path if needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  sortBy = 'title';
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books = this.bookService.getBooks();
  }

  onBookAdded(newBook: Book) {
    this.bookService.addBook(newBook);
    this.books = this.bookService.getBooks();
  }
}

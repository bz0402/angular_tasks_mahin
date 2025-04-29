import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchTerm = '';
  selectedGenre = '';
  sortBy = 'title';

  genres = ['Fiction', 'Science', 'History', 'Fantasy', 'Biography'];

  books: Book[] = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-help',
      published: new Date('2018-10-16'),
      status: 'Read',
      rating: 5,
      added: new Date('2023-04-15T14:45:00'),
      summary: 'An easy & proven way to build good habits and break bad ones.'
    },
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      published: new Date('1937-09-21'),
      status: 'Unread',
      rating: 4,
      added: new Date('2025-04-29T19:12:00'),
      summary: 'Bilbo Baggins goes on a journey across Middle-earth.'
    },
  ];

  // Variable to store the interval reference for real-time updates
  private timeInterval: any;

  ngOnInit(): void {
    this.timeInterval = setInterval(() => {
      this.books.forEach((book) => {
        if (book.added) {
          book.added = new Date(book.added);
        }
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to avoid memory leaks
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}

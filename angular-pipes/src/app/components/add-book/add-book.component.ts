import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'models/book.model';
import { BookService } from 'src/app/services/book.service'; // adjust path as needed

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;
  genres: string[] = [
    'Fiction', 'Science', 'History', 'Fantasy', 'Biography', 'Self-help', 'Thriller',
    'Mystery', 'Romance', 'Adventure', 'Philosophy', 'Spirituality', 'Science Fiction',
    'Poetry', 'Drama', 'Comedy', 'Crime', 'Horror', 'Classics', 'Art', 'Business',
    'Psychology', 'Politics', 'Memoir', 'Religion', 'Education', 'Cookbooks', 'Travel',
    'Health', 'Music', 'Photography', 'Technology', 'Economics', 'Environment', 'Parenting',
    'Sociology', 'Anthropology', 'Math', 'Astronomy', 'Law', 'Language', 'Sports',
    'Comics', 'Crafts', 'Gardening', 'Animals', 'War', 'Western', 'Satire', 'Samir'
  ];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      published: ['', Validators.required],
      status: ['Unread'],
      rating: [3, [Validators.min(1), Validators.max(5)]],
      summary: ['', Validators.maxLength(500)]
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = {
        ...this.bookForm.value,
        published: new Date(this.bookForm.value.published),
        added: new Date()
      };
      this.bookService.addBook(newBook);
      this.bookForm.reset({ status: 'Unread', rating: 3 });

      this.router.navigate(['/home']);
    }
  }
}

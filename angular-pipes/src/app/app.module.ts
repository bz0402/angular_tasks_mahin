import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent } from './components/book-card/book-card.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookSearchPipe } from './pipes/book-search.pipe';
import { SortBookByPipe } from './pipes/sort-book-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BookCardComponent,
    TimeAgoPipe,
    AddBookComponent,
    BookSearchPipe,
    SortBookByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

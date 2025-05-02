import { query } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, delay, distinctUntilChanged, filter, switchMap, tap } from "rxjs";
import { NewsResponse, NewsArticle } from "src/app/core/models/news-response.model";
import { NewsService } from "src/app/core/services/news.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  totalResults: number = 0;
  articles: NewsArticle[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private newsService: NewsService) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm.get('query')!.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((query: string) => query.length > 2),
      tap(() => {
        this.isLoading = true;
        this.articles = [];
        this.totalResults = 0;
      }),
      switchMap((query: string) => this.newsService.searchArticles(query.trim()))
    ).subscribe({
      next: (res: NewsResponse) => {
        this.articles = res.articles || [];
        this.totalResults = res.totalResults || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.articles = [];
        this.totalResults = 0;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  fetchArticles(query: string): void {
    this.isLoading = true;
    this.newsService.searchArticles(query).subscribe({
      next: (res: NewsResponse) => {
        this.articles = res.articles || [];
        this.totalResults = res.totalResults || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.articles = [];
        this.totalResults = 0;
        this.isLoading = false;
      },
    });
  }
}

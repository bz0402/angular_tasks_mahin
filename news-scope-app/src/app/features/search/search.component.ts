import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, delay, distinctUntilChanged } from "rxjs";
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
    this.searchForm.get('query')!.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((query: string) => {
        if (query && query.trim().length > 2) {
          this.fetchArticles(query.trim());
        } else {
          this.articles = [];
          this.totalResults = 0;
        }
      });
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

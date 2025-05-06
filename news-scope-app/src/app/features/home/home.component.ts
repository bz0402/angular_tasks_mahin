import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { NewsArticle, NewsResponse } from 'src/app/core/models/news-response.model';
import { delay, map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  totalResults: number = 0;
  topHeadlines$: Observable<NewsArticle[]> = of([]);
  isLoading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchTopHeadlines();
  }

  fetchTopHeadlines(): void {
    this.isLoading = true;
    this.topHeadlines$ = this.newsService.getTopHeadlines().pipe(
      tap(() => this.isLoading = false),
      tap(res => this.totalResults = res.totalResults || 0),
      map(res => res.articles || [])
    );
  }
}

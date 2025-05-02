import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import { NewsArticle, NewsResponse } from 'src/app/core/models/news-response.model';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalResults: number = 0;
  topHeadlines: NewsArticle[] = [];
  isLoading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchTopHeadlines();
  }

  fetchTopHeadlines(): void {
    this.isLoading = true;
    this.newsService.getTopHeadlines().subscribe({
      next: (res: NewsResponse) => {
        this.topHeadlines = res.articles || [];
        this.totalResults = res.totalResults || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching headlines:', err);
        this.topHeadlines = [];
        this.totalResults = 0;
        this.isLoading = false;
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { count, delay, Observable } from 'rxjs';
import { NewsResponse } from '../models/news-response.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  searchArticles(query: string) : Observable<NewsResponse> {

    const searchParams = {
      q: query,
      language: 'en'
    };

    return this.http.get<NewsResponse>(`${this.apiUrl}/everything`, { params: searchParams });
  }

  getTopHeadlines(): Observable<NewsResponse> {

    const topHeadlinesParams = {
      country: 'us',
      language: 'en'
    };

    return this.http.get<NewsResponse>(`${this.apiUrl}/top-headlines`, { params: topHeadlinesParams });
  }
}

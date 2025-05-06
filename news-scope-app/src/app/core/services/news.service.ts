import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsResponse, SourcesResponse } from '../models/news-response.model';
import { CacheEntry } from '../models/cache-entry.model';

@Injectable()
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2';
  private cacheTTL = 5 * 60 * 1000;

  private sourcesCache = new Map<string, CacheEntry<SourcesResponse>>();
  private topHeadlinesCache = new Map<string, CacheEntry<NewsResponse>>();
  private searchCache = new Map<string, CacheEntry<NewsResponse>>();

  constructor(private http: HttpClient) {}

  searchArticles(query: string): Observable<NewsResponse> {
    const key = `search-${query}`;
    const now = Date.now();

    const cached = this.searchCache.get(key);
    if (cached && (now - cached.timestamp) < this.cacheTTL) {
      return of(cached.data);
    }

    const searchParams = {
      q: query,
      language: 'en'
    };

    return this.http.get<NewsResponse>(`${this.apiUrl}/everything`, { params: searchParams }).pipe(
      map((res) => {
        this.searchCache.set(key, { timestamp: now, data: res });
        return res;
      })
    );
  }

  getTopHeadlines(): Observable<NewsResponse> {
    const key = `top-headlines-us-en`;
    const now = Date.now();

    const cached = this.topHeadlinesCache.get(key);
    if (cached && (now - cached.timestamp) < this.cacheTTL) {
      return of(cached.data);
    }

    const topHeadlinesParams = {
      country: 'us',
      language: 'en'
    };

    return this.http.get<NewsResponse>(`${this.apiUrl}/top-headlines`, { params: topHeadlinesParams }).pipe(
      map((res) => {
        this.topHeadlinesCache.set(key, { timestamp: now, data: res });
        return res;
      })
    );
  }

  getNewsSources(category: string, language: string, country: string): Observable<SourcesResponse> {
    const key = `${category}-${language}-${country}`;
    const now = Date.now();

    const cached = this.sourcesCache.get(key);
    if (cached && (now - cached.timestamp) < this.cacheTTL) {
      return of(cached.data);
    }

    const newsSourcesParams = new HttpParams()
      .set('category', category)
      .set('language', language)
      .set('country', country);

    return this.http.get<SourcesResponse>(`${this.apiUrl}/top-headlines/sources`, { params: newsSourcesParams }).pipe(
      map((response: SourcesResponse) => {
        this.sourcesCache.set(key, { timestamp: now, data: response });
        return response;
      })
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { NEWS_CATEGORIES, NEWS_COUNTRIES, NEWS_LANGUAGES } from 'src/app/core/constants/news-filters.constant';
import { NewsSource } from 'src/app/core/models/news-response.model';
import { NewsFilterService } from 'src/app/core/services/news-filter.service';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-our-sources',
  templateUrl: './our-sources.component.html',
  styleUrls: ['./our-sources.component.scss'],
})
export class OurSourcesComponent implements OnInit {
  newsSources$: Observable<NewsSource[]> = of([]);
  isLoading = false;

  categories = NEWS_CATEGORIES;
  languages = NEWS_LANGUAGES;
  countries = NEWS_COUNTRIES;

  selectedCategory: string = '';
  selectedLanguage: string = '';
  selectedCountry: string = '';

  constructor(
    private newsService: NewsService,
    private filterService: NewsFilterService
  ) {}

  ngOnInit(): void {

    // update selected filters in ui
    combineLatest([
      this.filterService.getCategory$(),
      this.filterService.getLanguage$(),
      this.filterService.getCountry$()
    ]).subscribe(([category, language, country]) => {
      this.selectedCategory = category;
      this.selectedLanguage = language;
      this.selectedCountry = country;
    });

    // fetch news sources
    this.newsSources$ = combineLatest([
      this.filterService.getCategory$(),
      this.filterService.getLanguage$(),
      this.filterService.getCountry$()
    ]).pipe(
      tap(() => this.isLoading = true),
      switchMap(([category, language, country]) =>
        this.newsService.getNewsSources(category, language, country)
      ),
      map(res => res.sources || []),
      tap(() => this.isLoading = false)
    );
  }

  onCategoryChange(category: string): void {
    this.filterService.setCategory(category);
  }

  onLanguageChange(language: string): void {
    this.filterService.setLanguage(language);
  }

  onCountryChange(country: string): void {
    this.filterService.setCountry(country);
  }

  hasActiveFilters(): boolean {
    return this.selectedCategory !== '' || this.selectedLanguage !== '' || this.selectedCountry !== '';
  }

  resetFilters(): void {
    this.filterService.setCategory('');
    this.filterService.setLanguage('');
    this.filterService.setCountry('');
  }
}

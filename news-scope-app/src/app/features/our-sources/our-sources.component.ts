import { Component, OnInit } from '@angular/core';
import { combineLatest, delay, map, Observable, of, switchMap, tap } from 'rxjs';
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

  categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  languages = [
    { code: 'ar', name: 'Arabic' },
    { code: 'de', name: 'German' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'he', name: 'Hebrew' },
    { code: 'it', name: 'Italian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ud', name: 'Urdu' },
    { code: 'zh', name: 'Chinese' }
  ];

  countries = [
    { code: 'ae', name: 'United Arab Emirates' },
    { code: 'ar', name: 'Argentina' },
    { code: 'at', name: 'Austria' },
    { code: 'au', name: 'Australia' },
    { code: 'be', name: 'Belgium' },
    { code: 'bg', name: 'Bulgaria' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'ch', name: 'Switzerland' },
    { code: 'cn', name: 'China' },
    { code: 'co', name: 'Colombia' },
    { code: 'cu', name: 'Cuba' },
    { code: 'cz', name: 'Czechia' },
    { code: 'de', name: 'Germany' },
    { code: 'eg', name: 'Egypt' },
    { code: 'fr', name: 'France' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'gr', name: 'Greece' },
    { code: 'hk', name: 'Hong Kong' },
    { code: 'hu', name: 'Hungary' },
    { code: 'id', name: 'Indonesia' },
    { code: 'ie', name: 'Ireland' },
    { code: 'il', name: 'Israel' },
    { code: 'in', name: 'India' },
    { code: 'it', name: 'Italy' },
    { code: 'jp', name: 'Japan' },
    { code: 'kr', name: 'South Korea' },
    { code: 'lt', name: 'Lithuania' },
    { code: 'lv', name: 'Latvia' },
    { code: 'ma', name: 'Morocco' },
    { code: 'mx', name: 'Mexico' },
    { code: 'my', name: 'Malaysia' },
    { code: 'ng', name: 'Nigeria' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'no', name: 'Norway' },
    { code: 'nz', name: 'New Zealand' },
    { code: 'ph', name: 'Philippines' },
    { code: 'pl', name: 'Poland' },
    { code: 'pt', name: 'Portugal' },
    { code: 'ro', name: 'Romania' },
    { code: 'rs', name: 'Serbia' },
    { code: 'ru', name: 'Russia' },
    { code: 'sa', name: 'Saudi Arabia' },
    { code: 'se', name: 'Sweden' },
    { code: 'sg', name: 'Singapore' },
    { code: 'si', name: 'Slovenia' },
    { code: 'sk', name: 'Slovakia' },
    { code: 'th', name: 'Thailand' },
    { code: 'tr', name: 'Turkey' },
    { code: 'tw', name: 'Taiwan' },
    { code: 'ua', name: 'Ukraine' },
    { code: 'us', name: 'United States' },
    { code: 've', name: 'Venezuela' },
    { code: 'za', name: 'South Africa' }
  ];

  selectedCategory: string = '';
  selectedLanguage: string = '';
  selectedCountry: string = '';

  constructor(
    private newsService: NewsService,
    private filterService: NewsFilterService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.filterService.getCategory$(),
      this.filterService.getLanguage$(),
      this.filterService.getCountry$()
    ]).subscribe(([category, language, country]) => {
      this.selectedCategory = category;
      this.selectedLanguage = language;
      this.selectedCountry = country;
    });

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

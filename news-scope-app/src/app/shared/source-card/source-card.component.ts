import { Component, Input } from '@angular/core';
import { NEWS_COUNTRIES, NEWS_LANGUAGES } from 'src/app/core/constants/news-filters.constant';
import { NewsSource } from 'src/app/core/models/news-response.model';

@Component({
  selector: 'app-source-card',
  templateUrl: './source-card.component.html',
  styleUrls: ['./source-card.component.scss']
})
export class SourceCardComponent {
  @Input() source!: NewsSource;

  getLanguageName(code: string): string {
    const lang = NEWS_LANGUAGES.find(l => l.code === code);
    return lang ? lang.name : code;
  }

  getCountryName(code: string): string {
    const country = NEWS_COUNTRIES.find(c => c.code === code);
    return country ? country.name : code;
  }
}

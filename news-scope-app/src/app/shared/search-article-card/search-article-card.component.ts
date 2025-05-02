import { Component, Input } from '@angular/core';
import { NewsArticle } from 'src/app/core/models/news-response.model';

@Component({
  selector: 'app-search-article-card',
  templateUrl: './search-article-card.component.html',
  styleUrls: ['./search-article-card.component.scss']
})
export class SearchArticleCardComponent {
  @Input() article!: NewsArticle;
}

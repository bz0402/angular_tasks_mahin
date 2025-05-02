import { Component, Input } from '@angular/core';
import { NewsArticle } from 'src/app/core/models/news-response.model';

@Component({
  selector: 'app-home-article-card',
  templateUrl: './home-article-card.component.html',
  styleUrls: ['./home-article-card.component.scss']
})
export class AppHomeArticleCardComponent {
  @Input() article!: NewsArticle;
}

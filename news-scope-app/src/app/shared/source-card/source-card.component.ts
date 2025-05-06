import { Component, Input } from '@angular/core';
import { NewsSource } from 'src/app/core/models/news-response.model';

@Component({
  selector: 'app-source-card',
  templateUrl: './source-card.component.html',
  styleUrls: ['./source-card.component.scss']
})
export class SourceCardComponent {
  @Input() source!: NewsSource;
}

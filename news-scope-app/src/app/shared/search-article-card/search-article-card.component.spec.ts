import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArticleCardComponent } from './search-article-card.component';

describe('SearchArticleCardComponent', () => {
  let component: SearchArticleCardComponent;
  let fixture: ComponentFixture<SearchArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

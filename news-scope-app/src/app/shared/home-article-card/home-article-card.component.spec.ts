import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArticleCardComponent } from './home-article-card.component';

describe('HomeArticleCardComponent', () => {
  let component: HomeArticleCardComponent;
  let fixture: ComponentFixture<HomeArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

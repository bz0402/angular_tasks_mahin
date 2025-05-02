import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonHomeArticleCardComponent } from './skeleton-home-article-card.component';

describe('SkeletonHomeArticleCardComponent', () => {
  let component: SkeletonHomeArticleCardComponent;
  let fixture: ComponentFixture<SkeletonHomeArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonHomeArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonHomeArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

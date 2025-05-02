import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSearchArticleCardComponent } from './skeleton-search-article-card.component';

describe('SkeletonSearchArticleCardComponent', () => {
  let component: SkeletonSearchArticleCardComponent;
  let fixture: ComponentFixture<SkeletonSearchArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonSearchArticleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonSearchArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

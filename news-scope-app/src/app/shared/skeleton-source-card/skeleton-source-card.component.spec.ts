import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSourceCardComponent } from './skeleton-source-card.component';

describe('SkeletonSourceCardComponent', () => {
  let component: SkeletonSourceCardComponent;
  let fixture: ComponentFixture<SkeletonSourceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonSourceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonSourceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

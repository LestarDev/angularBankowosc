import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReviewsComponent } from './form-reviews.component';

describe('FormReviewsComponent', () => {
  let component: FormReviewsComponent;
  let fixture: ComponentFixture<FormReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPagesComponent } from './onboarding-pages.component';

describe('OnboardingPagesComponent', () => {
  let component: OnboardingPagesComponent;
  let fixture: ComponentFixture<OnboardingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BvnVerificationComponent } from './bvn-verification.component';

describe('BvnVerificationComponent', () => {
  let component: BvnVerificationComponent;
  let fixture: ComponentFixture<BvnVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BvnVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BvnVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

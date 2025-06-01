import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinVerificationComponent } from './nin-verification.component';

describe('NinVerificationComponent', () => {
  let component: NinVerificationComponent;
  let fixture: ComponentFixture<NinVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NinVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

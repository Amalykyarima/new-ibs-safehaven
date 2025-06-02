import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityVerificationLayoutComponent } from './identity-verification-layout.component';

describe('IdentityVerificationLayoutComponent', () => {
  let component: IdentityVerificationLayoutComponent;
  let fixture: ComponentFixture<IdentityVerificationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityVerificationLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentityVerificationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

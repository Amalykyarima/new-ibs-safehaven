import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotpRegisterComponent } from './totp-register.component';

describe('TotpRegisterComponent', () => {
  let component: TotpRegisterComponent;
  let fixture: ComponentFixture<TotpRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotpRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateLoginComponent } from './corporate-login.component';

describe('CorporateLoginComponent', () => {
  let component: CorporateLoginComponent;
  let fixture: ComponentFixture<CorporateLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorporateLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

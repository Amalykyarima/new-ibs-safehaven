import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProfileCorporateComponent } from './setup-profile-corporate.component';

describe('SetupProfileCorporateComponent', () => {
  let component: SetupProfileCorporateComponent;
  let fixture: ComponentFixture<SetupProfileCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupProfileCorporateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupProfileCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

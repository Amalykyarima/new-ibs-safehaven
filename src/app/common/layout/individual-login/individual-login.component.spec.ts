import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLoginComponent } from './individual-login.component';

describe('IndividualLoginComponent', () => {
  let component: IndividualLoginComponent;
  let fixture: ComponentFixture<IndividualLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

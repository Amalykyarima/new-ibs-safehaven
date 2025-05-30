import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProfileFormComponent } from './setup-profile-form.component';

describe('SetupProfileFormComponent', () => {
  let component: SetupProfileFormComponent;
  let fixture: ComponentFixture<SetupProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupProfileFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProfileIndividualComponent } from './setup-profile-individual.component';

describe('SetupProfileIndividualComponent', () => {
  let component: SetupProfileIndividualComponent;
  let fixture: ComponentFixture<SetupProfileIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupProfileIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupProfileIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

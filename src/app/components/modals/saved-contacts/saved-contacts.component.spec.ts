import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedContactsComponent } from './saved-contacts.component';

describe('SavedContactsComponent', () => {
  let component: SavedContactsComponent;
  let fixture: ComponentFixture<SavedContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

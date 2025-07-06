import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringTableComponent } from './recurring-table.component';

describe('RecurringTableComponent', () => {
  let component: RecurringTableComponent;
  let fixture: ComponentFixture<RecurringTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecurringTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

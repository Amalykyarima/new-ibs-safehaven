import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringTransactionDetailsComponent } from './recurring-transaction-details.component';

describe('RecurringTransactionDetailsComponent', () => {
  let component: RecurringTransactionDetailsComponent;
  let fixture: ComponentFixture<RecurringTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringTransactionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecurringTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

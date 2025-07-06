import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRecordsComponent } from './transfer-records.component';

describe('TransferRecordsComponent', () => {
  let component: TransferRecordsComponent;
  let fixture: ComponentFixture<TransferRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferRecordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

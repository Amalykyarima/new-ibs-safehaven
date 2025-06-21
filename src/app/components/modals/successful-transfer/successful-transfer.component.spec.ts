import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulTransferComponent } from './successful-transfer.component';

describe('SuccessfulTransferComponent', () => {
  let component: SuccessfulTransferComponent;
  let fixture: ComponentFixture<SuccessfulTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfulTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessfulTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

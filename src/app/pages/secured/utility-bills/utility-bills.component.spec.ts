import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityBillsComponent } from './utility-bills.component';

describe('UtilityBillsComponent', () => {
  let component: UtilityBillsComponent;
  let fixture: ComponentFixture<UtilityBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilityBillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UtilityBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

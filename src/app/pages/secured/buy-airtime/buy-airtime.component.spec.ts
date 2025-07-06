import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAirtimeComponent } from './buy-airtime.component';

describe('BuyAirtimeComponent', () => {
  let component: BuyAirtimeComponent;
  let fixture: ComponentFixture<BuyAirtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyAirtimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyAirtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

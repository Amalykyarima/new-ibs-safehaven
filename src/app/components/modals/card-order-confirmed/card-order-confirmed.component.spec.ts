import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderConfirmedComponent } from './card-order-confirmed.component';

describe('CardOrderConfirmedComponent', () => {
  let component: CardOrderConfirmedComponent;
  let fixture: ComponentFixture<CardOrderConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOrderConfirmedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOrderConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

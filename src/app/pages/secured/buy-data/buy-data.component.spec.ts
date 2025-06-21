import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDataComponent } from './buy-data.component';

describe('BuyDataComponent', () => {
  let component: BuyDataComponent;
  let fixture: ComponentFixture<BuyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

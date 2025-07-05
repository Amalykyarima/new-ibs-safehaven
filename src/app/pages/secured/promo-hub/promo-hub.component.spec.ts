import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoHubComponent } from './promo-hub.component';

describe('PromoHubComponent', () => {
  let component: PromoHubComponent;
  let fixture: ComponentFixture<PromoHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

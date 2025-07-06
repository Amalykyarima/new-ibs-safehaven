import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VasHistoryComponent } from './vas-history.component';

describe('VasHistoryComponent', () => {
  let component: VasHistoryComponent;
  let fixture: ComponentFixture<VasHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VasHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VasHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

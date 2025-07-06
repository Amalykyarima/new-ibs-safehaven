import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementTableComponent } from './statement-table.component';

describe('StatementTableComponent', () => {
  let component: StatementTableComponent;
  let fixture: ComponentFixture<StatementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

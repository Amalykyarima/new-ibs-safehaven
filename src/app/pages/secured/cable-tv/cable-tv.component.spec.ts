import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CableTvComponent } from './cable-tv.component';

describe('CableTvComponent', () => {
  let component: CableTvComponent;
  let fixture: ComponentFixture<CableTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CableTvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CableTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

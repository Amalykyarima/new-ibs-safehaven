import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvProvidersComponent } from './tv-providers.component';

describe('TvProvidersComponent', () => {
  let component: TvProvidersComponent;
  let fixture: ComponentFixture<TvProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvProvidersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

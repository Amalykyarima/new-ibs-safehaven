import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountLayoutComponent } from './create-account-layout.component';

describe('CreateAccountLayoutComponent', () => {
  let component: CreateAccountLayoutComponent;
  let fixture: ComponentFixture<CreateAccountLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAccountLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

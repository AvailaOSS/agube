import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingPlaceManagementComponent } from './living-place-management.component';

describe('LivingPlaceManagementComponent', () => {
  let component: LivingPlaceManagementComponent;
  let fixture: ComponentFixture<LivingPlaceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingPlaceManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingPlaceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

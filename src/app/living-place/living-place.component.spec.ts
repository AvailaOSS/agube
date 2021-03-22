import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingPlaceComponent } from './living-place.component';

describe('LivinPlaceComponent', () => {
  let component: LivingPlaceComponent;
  let fixture: ComponentFixture<LivingPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

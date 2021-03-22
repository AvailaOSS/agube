import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DWellingManagementComponent } from './dwelling-management.component';

describe('DWellingManagementComponent', () => {
  let component: DWellingManagementComponent;
  let fixture: ComponentFixture<DWellingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DWellingManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DWellingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

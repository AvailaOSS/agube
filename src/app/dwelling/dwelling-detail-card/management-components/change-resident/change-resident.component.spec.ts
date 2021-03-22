import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeResidentComponent } from './change-resident.component';

describe('ChangeResidentComponent', () => {
  let component: ChangeResidentComponent;
  let fixture: ComponentFixture<ChangeResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeResidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

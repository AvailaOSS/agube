import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWaterFormComponent } from './new-water-form.component';

describe('NewWaterFormComponent', () => {
  let component: NewWaterFormComponent;
  let fixture: ComponentFixture<NewWaterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWaterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

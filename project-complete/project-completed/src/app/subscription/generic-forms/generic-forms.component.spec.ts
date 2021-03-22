import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFormsComponent } from './generic-forms.component';

describe('GenericFormsComponent', () => {
  let component: GenericFormsComponent;
  let fixture: ComponentFixture<GenericFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

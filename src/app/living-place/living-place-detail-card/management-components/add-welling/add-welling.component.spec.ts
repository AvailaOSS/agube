import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWellingComponent } from './add-welling.component';

describe('AddWellingComponent', () => {
  let component: AddWellingComponent;
  let fixture: ComponentFixture<AddWellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

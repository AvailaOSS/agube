import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePayComponent } from './change-pay.component';

describe('ChangePayComponent', () => {
  let component: ChangePayComponent;
  let fixture: ComponentFixture<ChangePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

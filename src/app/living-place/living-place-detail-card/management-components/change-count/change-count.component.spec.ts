import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCountComponent } from './change-count.component';

describe('ChangeCountComponent', () => {
  let component: ChangeCountComponent;
  let fixture: ComponentFixture<ChangeCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

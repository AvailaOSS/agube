import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDetailCardComponent } from './manager-detail-card.component';

describe('ManagerDetailCardComponent', () => {
  let component: ManagerDetailCardComponent;
  let fixture: ComponentFixture<ManagerDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

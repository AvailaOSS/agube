import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DWellingDetailCardComponent } from './dwelling-detail-card.component';

describe('DWellingDetailCardComponent', () => {
  let component: DWellingDetailCardComponent;
  let fixture: ComponentFixture<DWellingDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DWellingDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DWellingDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

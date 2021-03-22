import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentDetailsCardComponent } from './president-details-card.component';

describe('PresdentDetailsCardComponent', () => {
  let component: PresidentDetailsCardComponent;
  let fixture: ComponentFixture<PresidentDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresidentDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresdentDetailsCardComponent } from './presdent-details-card.component';

describe('PresdentDetailsCardComponent', () => {
  let component: PresdentDetailsCardComponent;
  let fixture: ComponentFixture<PresdentDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresdentDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresdentDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

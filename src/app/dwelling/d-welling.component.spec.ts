import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DWellingComponent } from './dwelling.component';

describe('LivinPlaceComponent', () => {
  let component: DWellingComponent;
  let fixture: ComponentFixture<DWellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DWellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DWellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

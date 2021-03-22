import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DWellingDetailListComponent } from './dwelling-detail-list.component';

describe('DWellingDetailListComponent', () => {
  let component: DWellingDetailListComponent;
  let fixture: ComponentFixture<DWellingDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DWellingDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DWellingDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

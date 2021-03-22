import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBillsComponent } from './all-bills.component';

describe('AllBillsComponent', () => {
  let component: AllBillsComponent;
  let fixture: ComponentFixture<AllBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

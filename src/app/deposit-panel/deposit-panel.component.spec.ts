import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPanelComponent } from './deposit-panel.component';

describe('DepositPanelComponent', () => {
  let component: DepositPanelComponent;
  let fixture: ComponentFixture<DepositPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

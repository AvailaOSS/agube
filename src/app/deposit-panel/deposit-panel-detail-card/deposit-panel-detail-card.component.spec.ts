import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPanelDetailCardComponent } from './deposit-panel-detail-card.component';

describe('DepositPanelDetailCardComponent', () => {
  let component: DepositPanelDetailCardComponent;
  let fixture: ComponentFixture<DepositPanelDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositPanelDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPanelDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

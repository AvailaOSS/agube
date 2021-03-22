import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPanelDetailListComponent } from './deposit-panel-detail-list.component';

describe('DepositPanelDetailListComponent', () => {
  let component: DepositPanelDetailListComponent;
  let fixture: ComponentFixture<DepositPanelDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositPanelDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPanelDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

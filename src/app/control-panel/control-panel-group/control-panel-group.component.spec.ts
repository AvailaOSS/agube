import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelGroupComponent } from './control-panel-group.component';

describe('ControlPanelGroupComponent', () => {
  let component: ControlPanelGroupComponent;
  let fixture: ComponentFixture<ControlPanelGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPanelGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

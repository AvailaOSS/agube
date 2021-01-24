import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelButtonComponent } from './control-panel-button.component';

describe('ControlPanelButtonComponent', () => {
  let component: ControlPanelButtonComponent;
  let fixture: ComponentFixture<ControlPanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPanelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

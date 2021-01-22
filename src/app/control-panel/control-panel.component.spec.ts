import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContorlPanelComponent } from './control-panel.component';

describe('ContorlPanelComponent', () => {
  let component: ContorlPanelComponent;
  let fixture: ComponentFixture<ContorlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContorlPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContorlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarBaseComponent } from './toolbar-base.component';

describe('ToolbarBaseComponent', () => {
  let component: ToolbarBaseComponent;
  let fixture: ComponentFixture<ToolbarBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

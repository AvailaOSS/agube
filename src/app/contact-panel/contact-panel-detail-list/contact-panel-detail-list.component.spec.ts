import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPanelDetailListComponent } from './contact-panel-detail-list.component';

describe('ContactPanelDetailListComponent', () => {
  let component: ContactPanelDetailListComponent;
  let fixture: ComponentFixture<ContactPanelDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPanelDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPanelDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

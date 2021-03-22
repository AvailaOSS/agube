import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPanelDetailCardComponent } from './contact-panel-detail-card.component';


describe('ContactPanelDetailCardComponent', () => {
  let component: ContactPanelDetailCardComponent;
  let fixture: ComponentFixture<ContactPanelDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPanelDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPanelDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPanelComponent } from './contact-panel.component';


describe('ContactPanelComponent', () => {
  let component: ContactPanelComponent;
  let fixture: ComponentFixture<ContactPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

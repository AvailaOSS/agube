import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactPanelManagementComponent } from './contact-panel-management.component';


describe('ContactPanelManagementComponent', () => {
  let component: ContactPanelManagementComponent;
  let fixture: ComponentFixture<ContactPanelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPanelManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPanelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsCardComponent } from './client-details-card.component';

describe('ClientDetailsCardComponent', () => {
  let component: ClientDetailsCardComponent;
  let fixture: ComponentFixture<ClientDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

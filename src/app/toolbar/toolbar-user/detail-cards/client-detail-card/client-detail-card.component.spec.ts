import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailCardComponent } from './client-detail-card.component';

describe('ClientDetailCardComponent', () => {
  let component: ClientDetailCardComponent;
  let fixture: ComponentFixture<ClientDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

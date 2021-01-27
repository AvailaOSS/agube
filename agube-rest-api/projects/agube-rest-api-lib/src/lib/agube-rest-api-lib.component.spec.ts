import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgubeRestApiLibComponent } from './agube-rest-api-lib.component';

describe('AgubeRestApiLibComponent', () => {
  let component: AgubeRestApiLibComponent;
  let fixture: ComponentFixture<AgubeRestApiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgubeRestApiLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgubeRestApiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

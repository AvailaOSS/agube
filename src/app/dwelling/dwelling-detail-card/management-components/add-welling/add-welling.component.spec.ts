import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDWellingComponent } from './add-welling.component';

describe('AdDWellingComponent', () => {
  let component: AdDWellingComponent;
  let fixture: ComponentFixture<AdDWellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdDWellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDWellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

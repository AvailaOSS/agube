import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingCountComponent } from './reading-count.component';

describe('ReadingCountComponent', () => {
  let component: ReadingCountComponent;
  let fixture: ComponentFixture<ReadingCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

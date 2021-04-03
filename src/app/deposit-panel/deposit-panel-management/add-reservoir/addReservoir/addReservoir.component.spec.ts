/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddReservoirComponent } from './addReservoir.component';

describe('AddReservoirComponent', () => {
  let component: AddReservoirComponent;
  let fixture: ComponentFixture<AddReservoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReservoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReservoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

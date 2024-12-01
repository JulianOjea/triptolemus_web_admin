/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_questionComponent } from './add_question.component';

describe('Add_questionComponent', () => {
  let component: Add_questionComponent;
  let fixture: ComponentFixture<Add_questionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_questionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_questionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

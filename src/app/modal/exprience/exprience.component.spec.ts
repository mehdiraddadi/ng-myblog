import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprienceComponent } from './exprience.component';

describe('ExprienceComponent', () => {
  let component: ExprienceComponent;
  let fixture: ComponentFixture<ExprienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

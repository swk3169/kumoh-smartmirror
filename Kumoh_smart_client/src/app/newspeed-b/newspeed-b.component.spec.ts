import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspeedBComponent } from './newspeed-b.component';

describe('NewspeedBComponent', () => {
  let component: NewspeedBComponent;
  let fixture: ComponentFixture<NewspeedBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspeedBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspeedBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

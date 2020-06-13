import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspeedAComponent } from './newspeed-a.component';

describe('NewspeedAComponent', () => {
  let component: NewspeedAComponent;
  let fixture: ComponentFixture<NewspeedAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspeedAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspeedAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

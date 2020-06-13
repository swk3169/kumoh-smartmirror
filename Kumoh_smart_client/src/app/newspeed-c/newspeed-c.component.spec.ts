import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspeedCComponent } from './newspeed-c.component';

describe('NewspeedCComponent', () => {
  let component: NewspeedCComponent;
  let fixture: ComponentFixture<NewspeedCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspeedCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspeedCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

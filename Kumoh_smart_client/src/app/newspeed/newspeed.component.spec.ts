import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspeedComponent } from './newspeed.component';

describe('NewspeedComponent', () => {
  let component: NewspeedComponent;
  let fixture: ComponentFixture<NewspeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

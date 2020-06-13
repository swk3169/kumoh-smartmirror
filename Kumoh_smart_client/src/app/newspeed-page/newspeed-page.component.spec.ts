import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspeedPageComponent } from './newspeed-page.component';

describe('NewspeedPageComponent', () => {
  let component: NewspeedPageComponent;
  let fixture: ComponentFixture<NewspeedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspeedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

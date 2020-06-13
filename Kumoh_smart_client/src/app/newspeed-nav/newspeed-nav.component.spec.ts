import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspeedNavComponent } from './newspeed-nav.component';

describe('NewspeedNavComponent', () => {
  let component: NewspeedNavComponent;
  let fixture: ComponentFixture<NewspeedNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspeedNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspeedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

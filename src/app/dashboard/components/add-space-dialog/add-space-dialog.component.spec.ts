import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpaceDialogComponent } from './add-space-dialog.component';

describe('AddSpaceDialogComponent', () => {
  let component: AddSpaceDialogComponent;
  let fixture: ComponentFixture<AddSpaceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpaceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

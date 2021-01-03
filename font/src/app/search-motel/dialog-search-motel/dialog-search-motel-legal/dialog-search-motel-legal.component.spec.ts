import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchMotelLegalComponent } from './dialog-search-motel-legal.component';

describe('DialogSearchMotelLegalComponent', () => {
  let component: DialogSearchMotelLegalComponent;
  let fixture: ComponentFixture<DialogSearchMotelLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchMotelLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchMotelLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

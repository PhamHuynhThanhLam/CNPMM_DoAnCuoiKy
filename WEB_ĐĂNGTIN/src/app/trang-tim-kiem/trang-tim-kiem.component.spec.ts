import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangTimKiemComponent } from './trang-tim-kiem.component';

describe('TrangTimKiemComponent', () => {
  let component: TrangTimKiemComponent;
  let fixture: ComponentFixture<TrangTimKiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrangTimKiemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangTimKiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

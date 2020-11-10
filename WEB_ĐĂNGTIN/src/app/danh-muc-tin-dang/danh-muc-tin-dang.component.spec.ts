import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucTinDangComponent } from './danh-muc-tin-dang.component';

describe('DanhMucTinDangComponent', () => {
  let component: DanhMucTinDangComponent;
  let fixture: ComponentFixture<DanhMucTinDangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhMucTinDangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucTinDangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

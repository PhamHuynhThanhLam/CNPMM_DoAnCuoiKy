import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ElementComponent } from './element/element.component';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { TrangChiTietComponent } from './trang-chi-tiet/trang-chi-tiet.component';
import { TrangTimKiemComponent } from './trang-tim-kiem/trang-tim-kiem.component';
import { DanhMucComponent } from './danh-muc/danh-muc.component';
import { DanhMucTinDangComponent } from './danh-muc-tin-dang/danh-muc-tin-dang.component';
import { ThongTinCoBanComponent } from './thong-tin-co-ban/thong-tin-co-ban.component';
import { ThongTinCoBanNextComponent } from './thong-tin-co-ban-next/thong-tin-co-ban-next.component';
import { ThongTinCoBanNextNextComponent } from './thong-tin-co-ban-next-next/thong-tin-co-ban-next-next.component';
import { ThongTinHinhAnhComponent } from './thong-tin-hinh-anh/thong-tin-hinh-anh.component';
import { ChonGoiTinThanhToanComponent } from './chon-goi-tin-thanh-toan/chon-goi-tin-thanh-toan.component';
import { ThanhToanDongComponent } from './thanh-toan-dong/thanh-toan-dong.component';

const routes: Routes = [
  { path: 'thanhtoandong',          component: ThanhToanDongComponent },
  { path: 'goithanhtoan',          component: ChonGoiTinThanhToanComponent },
  { path: 'thongtinhinhanh',          component: ThongTinHinhAnhComponent },
  { path: 'thongtin3',          component: ThongTinCoBanNextNextComponent },
  { path: 'thongtin2',          component: ThongTinCoBanNextComponent },
  { path: 'thongtin1',          component: ThongTinCoBanComponent },
  { path: 'danhmuctindang',          component: DanhMucTinDangComponent },
  { path: 'danhmuc',          component: DanhMucComponent },
  { path: 'timkiem',          component: TrangTimKiemComponent },
  { path: 'chitiet',          component: TrangChiTietComponent },
  {
    path: 'userlogin', component: UserloginComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'user',          component: UserComponent },
  { path: 'home',          component: ElementComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

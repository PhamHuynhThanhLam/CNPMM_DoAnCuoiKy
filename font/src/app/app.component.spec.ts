/* tslint:disable:no-unused-variable */
import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { routes } from "./app-routing.module";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

fdescribe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes),HttpClientTestingModule,HttpClientModule],
      declarations: [HomeComponent, LoginComponent, AppComponent]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(20);
    expect(done).toBeTruthy();

  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate([""]);
    tick();
    expect(location.path()).toBe("/home");
  }));

  it('navigate to "bang-gia-dich-vu" takes you to /bang-gia-dich-vu', fakeAsync(() => {
    router.navigate(['/home/bang-gia-dich-vu']);
    tick();
    expect(location.path()).toBe("/home/bang-gia-dich-vu");
  }));

});

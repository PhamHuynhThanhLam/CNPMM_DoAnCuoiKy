import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';
import { LoginComponent } from '../login/login.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Account } from '../model/Account';

fdescribe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let phoneEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule,FormsModule, HttpClientModule, RouterTestingModule],
          declarations: [LoginComponent],
          providers: [AuthenticationService],
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;

      component.ngOnInit();
  });

  it('should call auth login method', async(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthenticationService);
    let loginSpy = spyOn(authService , 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));

    loginElement.triggerEventHandler('ngSubmit', null);
    expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
   }));

  
});

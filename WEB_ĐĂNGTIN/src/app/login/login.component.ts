import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'demoApp';
  email:string;
  password:string;
  remail:string;
  rpassword:string;
  rcpassword:string;
 
   constructor(){
 
   }
   register() {
 
   }
   login() {
     if(this.email=="admin" && this.password=="admin"){
         
     }else{
    
     }
   }

  ngOnInit(): void {
  }

}

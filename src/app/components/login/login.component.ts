import { Component } from '@angular/core';
import { FormGroup , FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMessage = "" ;
  // register form and validation
  logInForm :FormGroup = new FormGroup({
      email:new FormControl("" , [Validators.required ,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password:new FormControl("" ,[Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])
  })

  handleForm():void{
    if(this.logInForm.valid == true){
      //send data to backend
  this._AuthService.logIn(this.logInForm.value).subscribe({
    next:(Response)=>{
      if(Response.message == 'success'){
        localStorage.setItem("_token" ,Response.token);
        this._Router.navigate(['/home'])
      }
      console.log(Response);
    },
    error:(err)=>{
    if(err.error.message){
      this._Router.navigate(['/register'])
    }
    }
  })
    }
  }
}

import { Component } from '@angular/core';
import { FormGroup , FormControl ,Validators, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMessage = "" ;
  // register form and validation
  registerForm :FormGroup = new FormGroup({
      name: new FormControl("" ,[ Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
      email:new FormControl("" , [Validators.required ,Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password:new FormControl("" ,[Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
      rePassword:new FormControl("" ),
      phone:new FormControl("" ,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , {validators:[this.conformPassword]} as FormControlOptions)

  conformPassword( group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if(rePassword?.value === ""){
      rePassword?.setErrors({required:true})
    }
    else if(password?.value !== rePassword?.value){
      rePassword?.setErrors({missMatch:true})
    }
  }

  handleForm():void{
    if(this.registerForm.valid == true){
      //send data to backend
  this._AuthService.register(this.registerForm.value).subscribe({
    next:(Response)=>{
      if(Response.message == 'success'){
        this._Router.navigate(['/login'])
      }
      console.log(Response);
    },
    error:(err)=>{
    this.errMessage = err.error.message;
      console.log(err);
    }
  })
    }
  }

}

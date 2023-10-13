import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor( private _Router:Router , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}
  cartId:any;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId =params.get('id')
      }
    })
  }
  errMessage = "" ;
  detailsForm:FormGroup = new FormGroup({
      details:new FormControl("" , [Validators.required]),
      phone:new FormControl("" ,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city:new FormControl("" ,[Validators.required])
  })

  handleForm():void{
  const details = this.detailsForm.value;
  const cartId = this.cartId;
  this._CartService.paymentMethod(cartId ,details).subscribe({
    next:(response)=>{
      window.open(response.session.url , '_self');
    },
    error:(err)=> {
      console.log(err);

    },
  })
  }

}

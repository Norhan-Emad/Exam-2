import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient ) { }
  mainToken:any = {
    token:localStorage.getItem("_token"),
  }

  AddCart(prodId:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
    {
    productId: prodId
  },
  )
  }

  getCartData():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart' ,
    {
      headers: this.mainToken
    })
  }

  removeProduct(prodID:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,
    {
      headers: this.mainToken
    })
  }

  updateCount(prodID:string , count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`,
    {
      count: count
    },
    {
      headers: this.mainToken
    })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
  )
  }

  paymentMethod(cartId:string , detailsObject:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200` ,
    {
      shippingAddress:detailsObject
  },
  )
  }
}

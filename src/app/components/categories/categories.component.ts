import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  constructor(private _CategoryService:CategoryService){}
  categoriesData:Category[]=[] ;
  catId:string ="" ;
  ngOnInit(): void {
    this._CategoryService.getCategory().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.categoriesData = response.data;
        this.catId = response.data._id;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


}

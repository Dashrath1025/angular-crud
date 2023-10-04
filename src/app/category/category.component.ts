import { Component,OnInit } from '@angular/core';
import { WebApiService } from '../web-api.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  constructor(private Service:WebApiService, private router:Router ) {}

  ngOnInit(): void {
    this.GetCategoryList();
  }
  formData: any = {};  
  CategoryList: any = [];


  GetCategoryList() {
    this.Service.getCategoryList().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }

  onDelete(id: any) {
    let request = confirm('Are you sure you want to delete this category?');
    if (request) {
      this.Service.deleteCategory(id).subscribe(response =>{
        if (response){
          alert("Record deleted successfully");
          this.GetCategoryList();
        }
        else {
          alert("Cannot delete category because products for this category Exist");
        }
      });
    }
  }
 
  OnEdit(id: number) {
    this.router.navigate(['/category/edit', id]);
  }
   
  OnSave() {
    const Name = this.formData.Name;
    const formData = new FormData();
    formData.append('Id', '0');
    formData.append('Name', Name);
    this.Service.addProduct(formData).subscribe(result => {
      if(result) {
        this.GetCategoryList();
      }
      else {
        alert("Duplicate Product name is not allowed");
      }
    });
  }

}

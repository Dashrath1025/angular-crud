import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { WebApiService } from '../web-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  constructor(private Service:WebApiService, private router:Router ) {}
  
  ngOnInit(): void {
    this.GetSubcategoryList();
  }
  SubCategoryList: any[]=[];
  formData: any = {};  

  GetSubcategoryList(){
    this.Service.getSubcategoryList().subscribe(data=>{
      this.SubCategoryList=data;
      console.log(data);
      
    });
  }


  onDelete(id: any) {
    let request = confirm('Are you sure you want to delete this category?');
    if (request) {
      this.Service.deleteSubCategory(id).subscribe(response =>{
        if (response){
          alert("Record deleted successfully");
          this.GetSubcategoryList();
        }
        else {
          alert("Cannot delete category because products for this category Exist");
        }
      });
    }
  }
 
  OnEdit(id: number) {
    this.router.navigate(['/subcategory/edit', id]);
  }
   
  OnSave() {
    const Name = this.formData.Name;
    const formData = new FormData();
    formData.append('Id', '0');
    formData.append('Name', Name);
    this.Service.addSubcategory(formData).subscribe(result => {
      if(result) {
        this.GetSubcategoryList();
      }
      else {
        alert("Duplicate Product name is not allowed");
      }
    });
  }




}

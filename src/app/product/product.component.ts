import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { WebApiService } from '../web-api.service';
import { Router,Route,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  constructor(private Service:WebApiService, private router:Router, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.GetProductList();
    this.GetCategoryList();
  }

  CategoryList: any[]=[];
  formData: any = {};
  ProductList: any = [];
  imageUrl: string = this.Service.imageUrl;
  fileData: any = null;
  profile?: string;
  name: string = "";



  GetProductList() {
    this.Service.getProductList().subscribe(data => {
      this.ProductList = data;
      console.log(data);
    });
  }

  GetCategoryList() {
    this.Service.Getcategory().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }

  onDelete(id: any) {
    let request = confirm('Are you sure you want to delete this product?');
    if (request) {
      this.Service.deleteProduct(id).subscribe(response =>{
        if (response){
          alert("Record deleted successfully");
          this.GetProductList();
        }
        else {
          alert("Something went wrong");
        }
      });
    }
  }


  OnEdit(id: number) {
    this.router.navigate(['/product/edit', id]);
  }

  DisplayCat(catId: number): string {

    const category = this.CategoryList.find((each: { id: number; }) => each.id === catId);

    return category ? category.name : '';

     }

  OnSave() {
    const Name = this.formData.Name;
    const Qty = this.formData.Qty;
    const Rate = this.formData.Rate;
    const IsActive = this.formData.IsActive;
    console.log(Name, Qty, Rate, IsActive);

    const formData = new FormData();
    formData.append('Id', '0');
    formData.append('Name', Name);
    formData.append('Qty', Qty);
    formData.append('Rate', Rate);
    formData.append('Profile', "img.jpg");
    formData.append('IsActive', IsActive);
    formData.append('CatId', "1");
    formData.append('Image', this.fileData);
    this.Service.addProduct(formData).subscribe(result => {
      if(result) {
        this.GetProductList();
      }
      else {
        alert("Duplicate Product name is not allowed");
      }
    });
  }

  handleUpload(event: any) {
    this.fileData = event.target.files[0];
    this.profile = event.target.files[0].name;
  }
}

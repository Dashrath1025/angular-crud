
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Route,Router } from '@angular/router';
import { WebApiService } from '../web-api.service';
import { FormGroup, FormsModule, FormBuilder, Validators,AbstractControl } from '@angular/forms';

function nameValidator(control: AbstractControl) {
  const firstChar = control.value.charAt(0);
  if (!isNaN(firstChar)) {
    return { 'startsWithNumber': true };
  }
  return null;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  CategoryList: any = [];

constructor(private Service:WebApiService, private route:Router, private formBuilder: FormBuilder) {}

productForm: FormGroup | any;
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name: ["", [Validators.required, Validators.maxLength(100),nameValidator,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      Qty: [0, [Validators.required, Validators.min(1)]],
      Rate: [0, [Validators.required, Validators.min(1)]],
      Category: [0, [Validators.required, Validators.min(1)]],
      IsActive: ["true"],
    });
    this.GetCategoryList();
  }

  formData: any = {};
  imageUrl: string = this.Service.imageUrl;
  fileData: any = null;
  profile?: string;

  GetCategoryList() {
    this.Service.Getcategory().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }


  onSubmit() {

    if (this.productForm.valid) {
    const productData = this.productForm.value;


    console.log(productData.Name, productData.Qty, productData.Rate, productData.IsActive,productData.Category);

    const formData = new FormData();
    formData.append('Id', '0');
    formData.append('Name', productData.Name);
    formData.append('Qty', productData.Qty);
    formData.append('Rate', productData.Rate);
    formData.append('Profile', "img.jpg");
    formData.append('IsActive', productData.IsActive);
    formData.append('CatId', productData.Category);
    formData.append('Image', this.fileData);
    this.Service.addProduct(formData).subscribe(result => {
      if(result) {
        alert("Product added successfully")
        this.route.navigate(['/product']);

      }
      else {
        alert("Duplicate Product name is not allowed");
      }
    });
  }
}


   handleUpload(event: any) {
    this.fileData = event.target.files[0];
    this.profile = event.target.files[0].name;
  }
  
  isFormValid() {
    return this.productForm && this.productForm.valid;
  }

  }






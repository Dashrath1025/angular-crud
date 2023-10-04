

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  productid:number | undefined;
  editproduct: any;
  CategoryList: any = [];

  product: any;
  updateForm: any;
  name: any;
  fileData: any = null;
  profile?: string;

  constructor(private route: ActivatedRoute, private WebApiService:WebApiService,private formBuilder: FormBuilder,private router:Router) {}
  imageUrl: string = this.WebApiService.imageUrl;
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productid = Number(params.get("id"));
      if (this.productid !== undefined) {
        this.WebApiService.EditProduct(this.productid).subscribe(data => {
          this.product = data;
          this.name= data.name;
          console.log(data);
          
          // Build the form inside the subscription callback
          this.updateForm = this.formBuilder.group({
            Name: [this.product.name, [Validators.required,Validators.maxLength(100),nameValidator,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
            Qty: [this.product.qty, [Validators.required, Validators.min(1)]],
            Rate: [this.product.rate, [Validators.required, Validators.min(1)]],
            IsActive: [this.product.isActive],
            Category: [this.product.catId, [Validators.required]]
          });
          
        });
      }
    });
    this.GetCategoryList();
  }
  GetCategoryList() {
    this.WebApiService.Getcategory().subscribe(data => {
      this.CategoryList = data;
      console.log(data);
    });
  }




  isFormValid() {
    return this.updateForm && this.updateForm.valid;
  }

onSubmit(){
  if (this.updateForm.valid) {
    const productData = this.updateForm.value;


    console.log(this.product.id,productData.Name, productData.Qty, productData.Rate, productData.IsActive,productData.Category,this.product.profile,this.fileData);

    const formData = new FormData();
    formData.append('Id', this.product.id);
    formData.append('Name', productData.Name);
    formData.append('Qty', productData.Qty);
    formData.append('Rate', productData.Rate);
    formData.append('Profile', this.product.profile);
    formData.append('IsActive', productData.IsActive);
    formData.append('CatId', productData.Category);
    formData.append('Image', this.fileData);
    this.WebApiService.updateProduct(formData).subscribe(result => {
      if(result) {
        alert("Product updated successfully")
        this.router.navigate(['product']);

      }
      else {
        alert("Can not update because this Product already exists");
      }
    });
   
  }
}


handleUpload(event: any) {
  this.fileData = event.target.files[0];
  this.profile = event.target.files[0].name;
}
}
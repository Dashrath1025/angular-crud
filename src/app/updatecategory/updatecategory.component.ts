import { Component,OnInit } from '@angular/core';
import { WebApiService } from '../web-api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

function nameValidator(control: AbstractControl) {
  const firstChar = control.value.charAt(0);
  if (!isNaN(firstChar)) {
    return { 'startsWithNumber': true };
  }
  return null;
}

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {
  catid:number | undefined;
  editcategory: any;
  CategoryList: any = [];

  category: any;
  updateForm: any;
  name: any;

  constructor(private route: ActivatedRoute, private WebApiService:WebApiService,private formBuilder: FormBuilder,private router:Router) {}
  imageUrl: string = this.WebApiService.imageUrl;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.catid = Number(params.get("id"));
      if (this.catid !== undefined) {
        this.WebApiService.EditCategory(this.catid).subscribe(data => {
          this.category = data;
          this.name= data.name;
          console.log(data);

          // Build the form inside the subscription callback
          this.updateForm = this.formBuilder.group({
            Name: [this.category.name, [Validators.required,Validators.maxLength(100),nameValidator,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]]
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


    console.log(this.category.id,productData.Name);

    const formData = new FormData();
    formData.append('Id', this.category.id);
    formData.append('Name', productData.Name);
    this.WebApiService.updateCategory(formData).subscribe(result => {
      if(result) {
        alert("Category updated successfully")
        this.router.navigate(['category']);

      }
      else {
        alert("Can not update because this category already exists");
      }
    });

  }
}

}

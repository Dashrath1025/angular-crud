import { Component } from '@angular/core';
import { WebApiService } from '../web-api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup,Validators,AbstractControl } from '@angular/forms';

function nameValidator(control:AbstractControl) {
  const firstChar = control.value.charAt(0);
  if (!isNaN(firstChar)) {
    return { 'startsWithNumber': true };
  }
  return null;
}


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})

export class AddcategoryComponent {
  CategoryList: any = [];
  constructor(private Service:WebApiService, private route:Router, private formBuilder: FormBuilder) {}



  categoryForm: FormGroup | any;
    ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        Name: ["", [Validators.required, Validators.maxLength(100),nameValidator,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      });
      this.GetCategoryList();
    }

    formData: any = {};


    GetCategoryList() {
      this.Service.Getcategory().subscribe(data => {
        this.CategoryList = data;
        console.log(data);
      });
    }


    onSubmit() {

      if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;

      console.log(categoryData.Name);

      const formData = new FormData();
      formData.append('Id', '0');
      formData.append('Name', categoryData.Name);
      this.Service.addCategory(formData).subscribe(result => {
        if(result) {
          alert("Category added successfully")
          this.route.navigate(['/category']);

        }
        else {
          alert("Duplicate category name is not allowed");
        }
      });
    }
  }

  
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebApiService } from './web-api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AddproductComponent,
    UpdateproductComponent,
    CategoryComponent,
    AddcategoryComponent,
    UpdatecategoryComponent,
    SubcategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

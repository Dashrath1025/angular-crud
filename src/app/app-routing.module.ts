import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { CategoryComponent } from './category/category.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';


const routes: Routes = [
  {path:'',component: ProductComponent},
  {path: 'product', component: ProductComponent},
  {path:'addnew',component:AddproductComponent},
  {path: 'product/edit/:id', component: UpdateproductComponent},
  {path: 'category',component:CategoryComponent},
  {path:'addcat',component:AddcategoryComponent},
  {path:'category/edit/:id', component: UpdatecategoryComponent},
  {path:'subcategory',component: SubcategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

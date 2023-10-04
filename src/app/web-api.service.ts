import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
   readonly apiUrl='http://localhost:5000/api/';
   readonly imageUrl='http://localhost:5000/images/';
  constructor(private http:HttpClient) { }

  getProductList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"Product");
  }

  getCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"Category");
  }

  getSubcategoryList():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+ "SubCategory")
  }

  addProduct(product:any):Observable<any>{

    return this.http.post(this.apiUrl+"Product/createproduct/",product);
  }

  addSubcategory(subcategory:any):Observable<any>{

    return this.http.post(this.apiUrl+"SubCategory/createsubcategory/",subcategory);
  }

  addCategory(category:any):Observable<any>{
    return this.http.post(this.apiUrl+"Category/createcategory/",category);
  }

  EditProduct(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Product/getproduct?id="+id);
  }

  EditCategory(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Category/getcategory?id="+id);
  }

  EditSubCategory(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"SubCategory/getsubcategory?id="+id);
  }

  updateProduct(product:any):Observable<any>{
    return this.http.put(this.apiUrl+"Product/updateproduct",product);
  }

  updateCategory(category:any):Observable<any>{
    return this.http.put(this.apiUrl+"Category/updateCategory",category);
  }

  updateSubCategory(subcategory:any):Observable<any>{
    return this.http.put(this.apiUrl+"SubCategory/updatesubcategory",subcategory);
  }

  getProductById(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Product?id="+id);
  }

  getCategoryById(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"Category?id="+id);
  }

  getsubCategoryById(id:number):Observable<any>{
    return this.http.get(this.apiUrl+"SubCategory?id="+id);
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"Product/deleteproduct?id="+id);

  }

  deleteCategory(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"Category/deletecategory?id="+id);

  }

  deleteSubCategory(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"SubCategory/deletesubcategory?id="+id);

  }

  Getcategory():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl +"Category");
  }
  


}

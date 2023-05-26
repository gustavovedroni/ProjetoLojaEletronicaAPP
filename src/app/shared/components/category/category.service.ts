import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public baseUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}`, category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './shared/components/product/product.component';
import { CategoryComponent } from './shared/components/category/category.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'home', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

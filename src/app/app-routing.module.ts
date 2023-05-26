import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './shared/components/product/product.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { UserComponent } from './shared/components/user/user.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'cadastrar', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'home', component: UserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

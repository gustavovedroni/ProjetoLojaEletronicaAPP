import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './shared/components/product/product.component';
import { UserComponent } from './shared/components/user/user.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { OrderComponent } from './shared/components/order/order.component';
import { ProductService } from './shared/components/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserComponent,
    CategoryComponent,
    OrderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

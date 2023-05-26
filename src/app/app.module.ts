import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './shared/components/user/user.component';
import { CategoryComponent } from './shared/components/category/category.component';
import { OrderComponent } from './shared/components/order/order.component';
import { ProductService } from './shared/components/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './shared/components/product/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFilter } from './shared/components/product/custom.filter';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserComponent,
    CategoryComponent,
    OrderComponent,
    NavBarComponent,
    CustomFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

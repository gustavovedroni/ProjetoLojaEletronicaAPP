import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  form: FormGroup;
  editForm: FormGroup;
  selectedProductId: number;
  @ViewChild('editModalContent', { static: true }) editModalContent: any;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      imgUrl: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imgUrl: ['', Validators.required]
    });
    this.selectedProductId = 0;
  }

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  async createProduct() {
    try {
      await this.productService.createProduct(this.form.value).subscribe(res => {
        console.log('Product created successfully!');
        this.refreshObj();
      });

    } catch (error) {
      console.log('Error:', error);
    }
  }

  async updateProduct(id: number, product: Product) {
    try {
      const result = await this.productService.updateProduct(id, product).subscribe();
      console.log('Product updated successfully!', result);
      this.refreshObj();
    } catch (error) {
      console.log('Error:', error);
    }
  }
  

  refreshObj() {
    this.http.get(this.productService.baseUrl).subscribe(
      res => this.products = res as Product[]);
  }

  openEditModal(productId: number) {
    this.selectedProductId = productId;
    const selectedProduct = this.products.find(product => product.id === productId);
    this.editForm.patchValue({
      name: selectedProduct!.name,
      price: selectedProduct!.price,
      description: selectedProduct!.description,
      imgUrl: selectedProduct!.imgUrl
    });
    this.modalService.open(this.editModalContent, { ariaLabelledBy: 'editModalLabel' });
  }
  

  closeEditModal() {
    this.modalService.dismissAll();
  }

  submitEditForm() {
    const updatedProduct = this.editForm.value;
    this.updateProduct(this.selectedProductId, updatedProduct);
    this.closeEditModal();
  }
}

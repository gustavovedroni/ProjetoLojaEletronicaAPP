import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router) {

    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
    });

  }

  async submit() {
    try {
      await this.categoryService.createCategory(this.form.value).subscribe(res => {
        console.log('Product created successfully!');
        this.router.navigate(['/cadastrar'])
      });

    } catch (error) {
      console.log('Error:', error);
    }
  }

}

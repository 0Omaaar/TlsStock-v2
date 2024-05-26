import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [SharedModule, ColorPickerModule, NgbDropdownModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent {
  addArticleForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  categories: any = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.addArticleForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      minQuantity: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });

    this.getCategories();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  addArticle() {
    if (this.addArticleForm.valid) {
      const formData: FormData = new FormData();
      if(this.selectedFile != null){
        formData.append('image', this.selectedFile);
      }
      formData.append('code', this.addArticleForm.get('code')?.value);
      formData.append('name', this.addArticleForm.get('name')?.value);
      formData.append('description', this.addArticleForm.get('description')?.value);
      formData.append('quantity', this.addArticleForm.get('quantity')?.value);
      formData.append('minQuantity', this.addArticleForm.get('minQuantity')?.value);
      formData.append('categoryId', this.addArticleForm.get('categoryId')?.value);

      this.articleService.addArticle(formData).subscribe((res) => {
        if (res.id != null) {
          console.log('success');
          this.router.navigateByUrl("/articles");
          this.snackbar.open("Article Ajoute Avec Succes !", 'Close', {
            duration: 5000
          })
        }
      });
    } else {
      for (const i in this.addArticleForm.controls) {
        this.addArticleForm.controls[i].markAsDirty();
        this.addArticleForm.controls[i].updateValueAndValidity();
      }
    }
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}

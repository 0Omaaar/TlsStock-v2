import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  addArticleForm!: FormGroup;
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;
  categories: any = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.addArticleForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
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
      formData.append('image', this.selectedFile);
      formData.append('code', this.addArticleForm.get('code')?.value);
      formData.append('name', this.addArticleForm.get('name')?.value);
      formData.append('description', this.addArticleForm.get('description')?.value);
      formData.append('quantity', this.addArticleForm.get('quantity')?.value);
      formData.append('categoryId', this.addArticleForm.get('categoryId')?.value);

      this.articleService.addArticle(formData).subscribe((res) => {
        if (res.id != null) {
          console.log('success');
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

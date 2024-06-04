import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.scss'
})
export class UpdateArticleComponent {
  updateArticleForm!: FormGroup;
  article: any;
  categories: any;
  imageSrc: string = '';
  selectedFile!: File;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const articleId = this.activatedRoute.snapshot.params['id'];
    this.findArticle(articleId);

    this.getCategories();
  }

  onFileSelected(event: any) {
    this.imageSrc = '';
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

  findArticle(id: number) {
    this.articleService.getArticle(id).subscribe((res) => {
      if (res && res.id !== null) {
        this.article = res;
        this.imageSrc = 'data:image/jpeg;base64,' + this.article.byteImage;

        this.updateArticleForm = this.fb.group({
          code: [this.article.code, [Validators.required]],
          name: [this.article.name, [Validators.required]],
          description: [this.article.description, [Validators.required]],
          quantity: [this.article.quantity, [Validators.required]],
        });
      }
    });
  }

  modifierArticle(){
    if (this.updateArticleForm.valid) {
      const formData: FormData = new FormData();
      formData.append('id', this.article.id);
      if(this.selectedFile != null){
        formData.append('image', this.selectedFile);
      }
      formData.append('code', this.updateArticleForm.get('code')?.value);
      formData.append('name', this.updateArticleForm.get('name')?.value);
      formData.append('description', this.updateArticleForm.get('description')?.value);
      formData.append('quantity', this.updateArticleForm.get('quantity')?.value);

      this.articleService.updateArticle(formData).subscribe((res) => {
        if (res.id != null) {
          this.router.navigateByUrl("articles");
          this.snackBar.open("Article Modifie Avec Succes !", 'Close', {
            duration: 5000
          });
        }
      });
    } else {
      for (const i in this.updateArticleForm.controls) {
        this.updateArticleForm.controls[i].markAsDirty();
        this.updateArticleForm.controls[i].updateValueAndValidity();
      }
    }
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }
}

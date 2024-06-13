import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { GetColorName } from 'hex-color-to-color-name';
import { color } from 'highcharts';


@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [SharedModule, ColorPickerModule, NgbDropdownModule, MatIconModule],
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
  imagePreview2!: string | ArrayBuffer | null;
  selectedFile2: any = null;
  selectedColor!: string;
  selectedQuantity!: number;
  selectedImage!: any;
  listOfColors: any[] = [];
  articleColorId: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    const articleId = this.activatedRoute.snapshot.params['id'];
    this.findArticle(articleId);

    this.getCategories();
  }

  addColor() {

    const colorName = GetColorName(this.selectedColor);

    const articleColorDto = {
      color: colorName,
      quantity: Number(this.selectedQuantity),
      image: this.selectedFile2
    }

    if ((articleColorDto.color == '') || (articleColorDto.quantity == 0) || (articleColorDto.image == null)) {
      this.snackBar.open("Erreur Survenue !", 'Close', { duration: 5000 });
    } else {
      this.listOfColors.push(articleColorDto);
      this.selectedColor = '';
      this.selectedQuantity = 0;
      this.selectedImage = null;
      this.selectedFile2 = null;
    }


  }

  onFileSelected(event: any) {
    this.imageSrc = '';
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }


  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];
    this.previewImage2();
  }

  previewImage2() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview2 = reader.result;
    };
    reader.readAsDataURL(this.selectedFile2);
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

        if (res.articleColors.length > 0) {
          this.listOfColors = res.articleColors;
        }

        this.updateArticleForm = this.fb.group({
          code: [this.article.code, [Validators.required]],
          name: [this.article.name, [Validators.required]],
          description: [this.article.description, [Validators.required]],
          quantity: [this.article.quantity, [Validators.required]],
        });
      }
    });
  }

  modifierArticle() {

    let totalArticleColorsQuantity: any = 0;



    if (this.updateArticleForm.valid) {
      const formData: FormData = new FormData();
      formData.append('id', this.article.id);
      if (this.selectedFile != null) {
        formData.append('image', this.selectedFile);
      }
      formData.append('code', this.updateArticleForm.get('code')?.value);
      formData.append('name', this.updateArticleForm.get('name')?.value);
      formData.append('description', this.updateArticleForm.get('description')?.value);
      formData.append('quantity', this.updateArticleForm.get('quantity')?.value);

      if (this.listOfColors.length > 0) {
        this.listOfColors.forEach((colorObj, index) => {

          totalArticleColorsQuantity += colorObj.quantity;

          if (colorObj.id == null) {
            formData.append(`articleColors[${index}].color`, colorObj.color);
            formData.append(`articleColors[${index}].quantity`, colorObj.quantity);


            formData.append(`articleColors[${index}].image`, colorObj.image);

          }

        });

      }
      console.log();
      console.log();
      if (this.updateArticleForm.get('quantity')?.value == totalArticleColorsQuantity) {
        this.articleService.updateArticle(formData).subscribe((res) => {
          if (res.id != null) {
            this.router.navigateByUrl("articles");
            this.snackBar.open("Article Modifie Avec Succes !", 'Close', {
              duration: 5000
            });
          }
        });
      } else {
        this.snackBar.open("Veuillez Enter Une Quantite Convenable !", 'Close', { duration: 5000 });
      }
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

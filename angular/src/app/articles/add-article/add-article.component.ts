import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { SousCategoryService } from 'src/app/services/sousCategory/sous-category.service';
import { color } from 'highcharts';
import { GetColorName } from 'hex-color-to-color-name';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [SharedModule, ColorPickerModule, NgbDropdownModule, MatIconModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss'
})
export class AddArticleComponent {
  addArticleForm!: FormGroup;
  selectedFile!: File;
  selectedFile2!: File;
  importFile: File | null = null;
  imagePreview!: string | ArrayBuffer | null;
  imagePreview2!: string | ArrayBuffer | null;
  categories: any = [];
  sousCategories: any = [];
  selectedCategory: any;
  selectedCategoryId: any;


  selectedColor!: string;
  selectedQuantity!: number;
  selectedImage!: any;

  listOfColors: any[] = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private sousCategoryService: SousCategoryService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.addArticleForm = this.fb.group({
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      minQuantity: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      sousCategoryId: [null, [Validators.required]],
    });

    this.getCategories();


    // this.getSousCategories();
  }

  addColor() {

    const colorName = GetColorName(this.selectedColor);

    const articleColorDto = {
      color: colorName,
      quantity: Number(this.selectedQuantity),
      image: this.selectedFile2
    }

    if ((articleColorDto.color == '') || (articleColorDto.quantity == 0) || (articleColorDto.image == null)) {
      this.snackbar.open("Erreur Survenue !", 'Close', { duration: 5000 });
    } else {
      this.listOfColors.push(articleColorDto);
      this.selectedColor = '';
      this.selectedQuantity = 0;
      this.selectedImage = null;

    }

  }

  storeCategory(event: Event) {
    const selectedCategory = event.target as HTMLSelectElement;
    this.selectedCategoryId = selectedCategory.value;
    this.categoryService.getCategorie(this.selectedCategoryId).subscribe(res => {
      this.selectedCategory = res;
      this.getSousCategories();
    })
  }

  getSousCategories() {
    this.sousCategories = [];
    this.sousCategoryService.getSousCategories().subscribe((res: any[]) => {
      res.forEach(element => {
        if (element.categoryId == this.selectedCategoryId) {
          this.sousCategories.push(element);
        }
      });
    });
  }

  onFileChange(event: any) {
    this.importFile = event.target.files[0];
    console.log(this.importFile);
  }

  upload() {
    if (this.importFile) {
      this.articleService.upload(this.importFile).subscribe(
        (response) => {
          console.log('Upload successful', response);
          this.snackbar.open('Articles Ajoutés Avec Succes !', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/articles');
        },
        (error) => {
          this.snackbar.open('Upload Failed !', 'Close', {
            duration: 5000
          });
          console.error('Upload failed', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
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


  addArticle() {

    let totalArticleColorsQuantity: any = 0;

    if (this.addArticleForm.valid) {
      const formData: FormData = new FormData();
      if (this.selectedFile != null) {
        formData.append('image', this.selectedFile);
      }
      formData.append('code', this.addArticleForm.get('code')?.value);
      formData.append('name', this.addArticleForm.get('name')?.value);
      formData.append('description', this.addArticleForm.get('description')?.value);
      formData.append('quantity', this.addArticleForm.get('quantity')?.value);
      formData.append('minQuantity', this.addArticleForm.get('minQuantity')?.value);
      formData.append('categoryId', this.addArticleForm.get('categoryId')?.value);
      formData.append('sousCategoryId', this.addArticleForm.get('sousCategoryId')?.value);


      if (this.listOfColors.length > 0) {
        this.listOfColors.forEach((colorObj, index) => {
          formData.append(`articleColors[${index}].color`, colorObj.color);
          formData.append(`articleColors[${index}].quantity`, colorObj.quantity);

          totalArticleColorsQuantity += colorObj.quantity;

          if (this.selectedFile2 != null) {
            formData.append(`articleColors[${index}].image`, colorObj.image);
          }
        });
      }

      if (totalArticleColorsQuantity == 0) {
        this.articleService.addArticle(formData).subscribe((res) => {
          if (res.id != null) {
            console.log('success');
            this.router.navigateByUrl('/articles');
            this.snackbar.open('Article Ajoute Avec Succes !', 'Close', {
              duration: 5000
            });
          }
        });
      }

      if (totalArticleColorsQuantity != 0) {
        if (totalArticleColorsQuantity != this.addArticleForm.get('quantity')?.value) {
          this.snackbar.open("Veuillez Choisir Une Quantite Convenable !", 'Close', {
            duration: 5000
          })
        } else {
          this.articleService.addArticle(formData).subscribe((res) => {
            if (res.id != null) {
              console.log('success');
              this.router.navigateByUrl('/articles');
              this.snackbar.open('Article Ajoute Avec Succes !', 'Close', {
                duration: 5000
              });
            }
          });
        }
      }
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

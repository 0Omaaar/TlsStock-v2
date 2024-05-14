import { Component, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Console } from 'console';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-categories',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule, MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './get-categories.component.html',
  styleUrl: './get-categories.component.scss'
})
export class GetCategoriesComponent {
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'description', 'nbArticles', 'actions'];
  dataSource = new MatTableDataSource<any>();
  articlesCount: number = 0;

  categories!: any;
  addCategoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  searchForm!: FormGroup;
  addModal: boolean = false;
  updateModal: boolean = false;
  isAdding: boolean = false;
  isUpdating: boolean = false;
  deletedCategory!: any;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private routerLink: Router
  ) {}

  deleteCategoryStore(categoryDto: any) {
    this.deletedCategory = categoryDto;
  }

  toggleAddModal() {
    this.addModal = !this.addModal;
    this.isAdding = true;

    if (this.addModal && this.isAdding) {
      this.initAddCategoryForm();
    }
  }
  toggleUpdateModal(categoryDto: any) {
    this.updateModal = !this.updateModal;
    this.isUpdating = true;

    if (this.updateModal && this.isUpdating) {
      this.initUpdateCategoryForm(categoryDto);
    }
  }

  initAddCategoryForm() {
    this.addCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  initUpdateCategoryForm(categoryDto: any) {
    this.updateCategoryForm = this.fb.group({
      id: [categoryDto.id],
      name: [categoryDto.name, [Validators.required]],
      description: [categoryDto.description, [Validators.required]]
    });
  }

  editCategory(categoryDto: any) {
    this.initUpdateCategoryForm(categoryDto);
    this.toggleUpdateModal(categoryDto);
  }

  updateCategory() {
    if (this.updateCategoryForm.valid) {
      this.categoryService.updateCategorie(this.updateCategoryForm.value).subscribe((res) => {
        if (res.id != null) {
          this.getCategories();
          this.snackbar.open('Categorie Modifiee Avec Succes !', 'Close', {
            duration: 5000
          });
        }
      });
    }
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
      this.initUpdateCategoryForm(this.categories[0]);
      this.dataSource.data = res;
    });
  }

  getCategoriesByName() {
    const name = this.searchForm.get('name')?.value;
    this.categoryService.getCategoriesByName(name).subscribe((res) => {
      this.categories = res;
      this.dataSource.data = res;
    });
  }

  ajouterCategorie() {
    if (this.addCategoryForm.valid) {
      this.categoryService.addCategorie(this.addCategoryForm.value).subscribe((res) => {
        if (res.id != null) {
          console.log('success');
          this.getCategories();
          this.snackbar.open('Categorie Ajoutee Avec Succes !', 'Close', {
            duration: 5000
          });
        }
      });
    }
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.deletedCategory).subscribe((res) => {
      if (res) {
        this.closeButton.nativeElement.click();
        this.getCategories();
        this.snackbar.open('Categorie Supprimee Avec Succes !', 'Close', {
          duration: 5000
        });
      }
    });
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: ['']
    });

    this.initAddCategoryForm();
    this.getCategories();
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-get-categories',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule, ColorPickerModule],
  templateUrl: './get-categories.component.html',
  styleUrl: './get-categories.component.scss'
})
export class GetCategoriesComponent {
  // @ViewChild('deleteCategoryModal') deleteCategoryModal!: any;
  @ViewChild('closeButton') closeButton!: ElementRef;


  categories!: any;
  addCategoryForm!: FormGroup;
  updateCategoryForm!: FormGroup;
  addModal: boolean = false;
  updateModal: boolean = false;
  isAdding: boolean = false;
  isUpdating: boolean = false;
  deletedCategory!: any;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
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
        }
      });
    }
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
      this.initUpdateCategoryForm(this.categories[0]);
    });
  }

  ajouterCategorie() {
    if (this.addCategoryForm.valid) {
      this.categoryService.addCategorie(this.addCategoryForm.value).subscribe((res) => {
        if (res.id != null) {
          console.log('success');
          this.getCategories();
        }
      });
    }
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.deletedCategory).subscribe((res) => {
      if (res) {
        this.closeButton.nativeElement.click();
        this.getCategories();
      }
    });
  }

  ngOnInit() {
    this.initAddCategoryForm();
    this.getCategories();
  }
}

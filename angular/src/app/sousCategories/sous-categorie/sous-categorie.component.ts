import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { SousCategoryService } from 'src/app/services/sousCategory/sous-category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-sous-categorie',
  standalone: true,
  imports: [SharedModule, NgbDropdownModule, MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './sous-categorie.component.html',
  styleUrl: './sous-categorie.component.scss'
})
export class SousCategorieComponent {
  sousCategories: any = [];
  categories: any = [];
  sousCategoryToDelete!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('close') closeButton!: ElementRef;
  @ViewChild('closeButton') closeButtonDelete!: ElementRef;
  displayedColumns: string[] = ['position', 'name', 'description', 'category', 'nbArticles', 'actions'];
  dataSource = new MatTableDataSource<any>();
  addSousCategoryForm!: FormGroup;

  constructor(
    private sousCategoryService: SousCategoryService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSousCategories();
    this.getCategories();

    this.addSousCategoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  saveSousCategory() {
    const sousCategoryDto = {
      name: this.addSousCategoryForm.get('name')?.value,
      description: this.addSousCategoryForm.get('description')?.value,
      categoryId: this.addSousCategoryForm.get('categoryId')?.value
    };

    if (this.addSousCategoryForm.valid) {
      this.sousCategoryService.addSousCategory(sousCategoryDto).subscribe((res) => {
        if (res != null) {
          this.snackBar.open('Sous Categorie Ajoutée !', 'Close', {
            duration: 5000
          });
          this.getSousCategories();
          this.closeButton.nativeElement.click();
        } else {
          this.snackBar.open('Erreur Survenue Lors De la Creation !', 'Close', {
            duration: 5000
          });
        }
      });
    } else {
      this.snackBar.open('Erreue Survenue !', 'Close', {
        duration: 5000
      });
    }
  }

  getSousCategories() {
    this.sousCategoryService.getSousCategories().subscribe((res) => {
      this.sousCategories = res;
      this.dataSource.data = res;
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  storeSousCategoryToDelete(sousCategoryDto: any) {
    this.sousCategoryToDelete = sousCategoryDto;
  }

  deleteSousCategory() {
    this.sousCategoryService.deleteSousCategory(this.sousCategoryToDelete).subscribe((res) => {
      if (res) {
        this.closeButtonDelete.nativeElement.click();
        this.snackBar.open('Sous Categorie Supprimeée', 'Close', {
          duration: 5000
        });
        this.getSousCategories();
        this.sousCategoryToDelete = {};
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

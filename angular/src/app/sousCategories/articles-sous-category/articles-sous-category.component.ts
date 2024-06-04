import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SousCategoryService } from 'src/app/services/sousCategory/sous-category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-articles-sous-category',
  standalone: true,
  imports: [SharedModule, RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './articles-sous-category.component.html',
  styleUrl: './articles-sous-category.component.scss'
})
export class ArticlesSousCategoryComponent {
  displayedColumns: string[] = ['position', 'code', 'name', 'description', 'quantity', 'photo', 'categoryName', 'sousCategoryName'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sousCategoryId!: number;

  constructor(private activatedRoute: ActivatedRoute, 
    private sousCategoryService: SousCategoryService
  ){}

  ngOnInit(){
    this.sousCategoryId = this.activatedRoute.snapshot.params['id'];

    this.getArticles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getArticles(){
    this.sousCategoryService.getArticlesBySousCategory(this.sousCategoryId).subscribe(res => {
      this.dataSource.data = res;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

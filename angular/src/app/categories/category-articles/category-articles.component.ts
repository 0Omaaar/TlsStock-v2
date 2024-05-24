import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-category-articles',
  standalone: true,
  imports: [SharedModule, RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './category-articles.component.html',
  styleUrl: './category-articles.component.scss'
})
export class CategoryArticlesComponent {
  displayedColumns: string[] = ['position', 'code', 'name', 'description', 'quantity', 'photo', 'categoryName'];
  dataSource = new MatTableDataSource<any>();

  articles: any[] = [];
  article: any;
  searchForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getCategoryArticles(id);
    this.searchForm = this.fb.group({
      keyword: ['']
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCategoryArticles(id: number) {
    this.categoryService.getArticlesByCategoryId(id).subscribe( {
      next: data => {
        this.articles = data.map((element: { image: any; processedImg: string; byteImage: string }) => {
          if (element.byteImage != null) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
          }
          return element;
        });
        this.dataSource.data = this.articles;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchArticles() {
    const keyword = this.searchForm.get('keyword')?.value;
    this.articleService.searchArticles(keyword).subscribe((res) => {
      this.articles = res.map((element: { image: any; processedImg: string; byteImage: string }) => {
        if (element.byteImage != null) {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
        }
        return element;
      });
      this.dataSource.data = this.articles;
    });
  }
}

import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [SharedModule, RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements AfterViewInit, OnInit {
  @ViewChild('closeButton') closeButton!: ElementRef;
  displayedColumns: string[] = ['position', 'code', 'name', 'description', 'quantity', 'dispoQuantity', 'photo', 'categoryName', 'actions'];
  dataSource = new MatTableDataSource<any>();

  articles: any[] = [];
  article: any;
  searchForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getArticles();
    this.searchForm = this.fb.group({
      keyword: ['']
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getArticles() {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data.map((element: { image: any; processedImg: string; byteImage: string }) => {
          if (element.byteImage != null) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
          }
          return element;
        });
        this.dataSource.data = this.articles;
      },
      error: (error) => {
        console.error(error);
      }
    });
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

  storeArticle(articleDto: any) {
    this.article = articleDto;
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article).subscribe((res) => {
      if (res) {
        this.closeButton.nativeElement.click();
        this.getArticles();
        this.snackbar.open('Article Supprime Avec Succes !', 'Close', {
          duration: 5000
        });
      }
    });
  }
}

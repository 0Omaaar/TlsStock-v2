import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import jsPDF from 'jspdf';
// import * as jsPDF from 'jspdf';

import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [SharedModule, RouterModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements AfterViewInit, OnInit {
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('content') content!: ElementRef;

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


  saveExcel() {
    const tableBody = this.articles.map((article) => [
      article.processedImg ? 'Image' : 'PAS_DE_PHOTO',
      article.code,
      article.name,
      article.description,
      article.quantity,
      article.dispoQuantity
    ]);
  
    const ws_data = [
      ['Image', 'Code', 'Nom', 'Description', 'Quantite', 'Quantite Dispo'],
      ...tableBody
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Articles');
  
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
  
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xFF;
    }
  
    FileSaver.saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'articles.xlsx');
  }
  

  savePdf(): void {
    const doc = new jsPDF();

    const tableBody = this.articles.map((article: any) => [
      '', // Placeholder for image or "NO_PICTURE"
      article.code,
      article.name,
      article.description,
      article.quantity,
      article.dispoQuantity
    ]);

    autoTable(doc, {
      head: [['Image', 'Code', 'Nom', 'Description', 'Quantite', 'Quantite Dispo']],
      body: tableBody,
      didDrawCell: (data: any) => {
        if (data.section === 'body' && data.column.index === 0) {
          const article = this.articles[data.row.index];
          if (article.processedImg) {
            const img = this.converToImage(article.processedImg);
            const cellWidth = data.cell.width;
            const cellHeight = data.cell.height;
            const imgWidth = 20;
            const imgHeight = 20;
            const xPos = data.cell.x + (cellWidth - imgWidth) / 2;
            const yPos = data.cell.y + (cellHeight - imgHeight) / 2;
            doc.addImage(img, 'JPEG', xPos, yPos, imgWidth, imgHeight);
          } else {
            const text = 'PAS_DE_PHOTO';
            const textWidth = doc.getTextWidth(text);
            const cellWidth = data.cell.width;
            const xPos = data.cell.x + (cellWidth - textWidth) / 2;
            const yPos = data.cell.y + 10;
            doc.text(text, xPos, yPos);
          }
        }
      },
      styles: { cellPadding: { top: 10, right: 5, bottom: 10, left: 5 } },
      headStyles: { fillColor: [0, 0, 255] },
      theme: 'grid'
    });

    doc.save('articles.pdf');
  }

  converToImage(base64: string): string {
    return base64;
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

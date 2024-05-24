import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { StockMovementService } from 'src/app/services/stockMovements/stock-movement.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CorrectionStockComponent } from '../correction-stock/correction-stock.component';

@Component({
  selector: 'app-get-stock-movements',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    SharedModule
  ],
  templateUrl: './get-stock-movements.component.html',
  styleUrl: './get-stock-movements.component.scss'
})
export class GetStockMovementsComponent {
  constructor(
    private stockMovementService: StockMovementService,
    private dialog: MatDialog
  ) {}
  articlesList: any[] = [];
  currentArticles: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this.getArticlesWithStock();
  }

  openDialog(articleDto: any) {
    const dialogRef = this.dialog.open(CorrectionStockComponent, {
      width: '30%',
      height: '35%',
      data: {
        article: articleDto
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getArticlesWithStock();
    });
  }

  getArticlesWithStock() {
    this.stockMovementService.getArticlesStock().subscribe({
      next: (data) => {
        this.articlesList = data.map((element: { image: any; processedImg: string; byteImage: string }) => {
          if (element.byteImage != null) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
          }
          return element;
        });
        this.updatecurrentArticles();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updatecurrentArticles(pageEvent?: PageEvent) {
    const startIndex = pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0;
    const endIndex = startIndex + (pageEvent ? pageEvent.pageSize : 3);
    this.currentArticles = this.articlesList.slice(startIndex, endIndex);
  }
}

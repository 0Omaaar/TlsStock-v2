import { CommonModule } from '@angular/common';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { StockMovementService } from 'src/app/services/stockMovements/stock-movement.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-correction-stock',
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
  templateUrl: './correction-stock.component.html',
  styleUrl: './correction-stock.component.scss'
})
export class CorrectionStockComponent {
  @Output() stockMovementSaved = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockMovementService: StockMovementService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CorrectionStockComponent>
  ) {}

  article: any = null;

  typeMvt: string | null = null;
  quantity: number = 0;

  ngOnInit() {
    // this.article = this.data;
  }

  saveStockMovement() {
    if(this.typeMvt == null || this.quantity <= 0){
      this.snackBar.open("Veuillez Remplir Les Champs !", 'Close', {
        duration: 5000
      })
    }

    const stockMovementDto = {
      articleId: this.data.article.id,
      articleName: this.data.article.name,
      typeMvt: this.typeMvt,
      quantity: this.quantity
    };

    this.stockMovementService.correctionStock(stockMovementDto).subscribe({
      next: data => {
          this.dialog.closeAll();
          this.snackBar.open("Mouvement De Stock Ajouté", 'Close', {
            duration: 5000
          });
          this.dialogRef.close(true);
          this.stockMovementSaved.emit();
      }, 
      error: error => {
        console.log(error);
      }
    })
  }
}

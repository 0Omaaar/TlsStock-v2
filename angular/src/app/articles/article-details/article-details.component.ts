import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { ArticleComponent } from '../articles/article.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  orders: any[] = [];
  constructor(
    private clientOrderService: ClientOrderService,
    public dialogRef: MatDialogRef<ArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public article: any
  ) {}

  ngOnInit() {
    this.clientOrderService.getOrdersByArticle(this.article.article.id).subscribe( res => {
      this.orders = res;
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}

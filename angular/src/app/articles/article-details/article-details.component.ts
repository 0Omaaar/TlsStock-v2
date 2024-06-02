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
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  orders: any[] = [];
  private routerSubscription!: Subscription;
  qrCodeImageSrc!: string;


  constructor(
    private clientOrderService: ClientOrderService,
    public dialogRef: MatDialogRef<ArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public article: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientOrderService.getOrdersByArticle(this.article.article.id).subscribe( res => {
      this.orders = res;
    })

    this.qrCodeImageSrc = `data:image/png;base64,${this.article.article.qrCodeImage}`;

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.dialogRef.close();
      }
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

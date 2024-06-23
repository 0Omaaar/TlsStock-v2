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
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/articles/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgbCollapseModule
  ],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  orders: any[] = [];
  private routerSubscription!: Subscription;
  qrCodeImageSrc!: string;
  articleDet: any;
  isCollapsed = true;
  predictedQuantity: any = null;


  constructor(
    private clientOrderService: ClientOrderService,
    private articleService: ArticleService,
    public dialogRef: MatDialogRef<ArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public article: any,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.clientOrderService.getOrdersByArticle(this.article.article.id).subscribe(res => {
      this.orders = res;
    })

    this.qrCodeImageSrc = `data:image/png;base64,${this.article.article.qrCodeImage}`;

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.dialogRef.close();
      }
    });

    this.articleDet = this.article.article;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getPredictedQuantityByArithmeticAverage(articleId: number) {
    this.predictedQuantity = null;

    this.articleService.arithmeticAverageQuantity(articleId).subscribe(res => {
      if (res != null) {
        this.predictedQuantity = res;
      } else {
        this.snackBar.open("Erreur Survenue !", 'Close', {
          duration: 5000
        })
      }
    })
  }

  getPredictedQuantityByTrainedModel(articleId: number) {
    this.predictedQuantity = null;

    this.articleService.trainedModelQuantity(articleId).subscribe(res => {
      if (res != null) {
        this.predictedQuantity = res;
      } else {
        this.snackBar.open("Erreur Survenue !", 'Close', {
          duration: 5000
        })
      }
    })
  }


  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

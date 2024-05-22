import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { ArticleService } from 'src/app/services/articles/article.service';
import { CategoryService } from 'src/app/services/category.service';
import { ClientService } from 'src/app/services/clients/client.service';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  imports: [SharedModule, FormsModule, MatIconModule],
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss'
})
export class EditOrderComponent {
  orderId!: number;
  categories: any;
  category: any = null;
  articles: any;
  selectedArticleId: any = null;
  clientId: any = null;
  selectedArticle: any = null;
  selectedQuantity: number = 0;
  selectedArticleDispoQuantity: any = null;
  articlesList: any = [];
  filteredArticlesList: any[] = [];

  isArticleSelected: boolean = false;
  selectedArticleName: string = '';

  searchkeyArticle!: string;

  orderLinesList: Array<any> = [];
  order: any = {};

  constructor(
    private categorieService: CategoryService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private clientOrderService: ClientOrderService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['id'];

    this.getCategories();
    this.getArticles();
    this.getOrderLines();
  }

  getOrderLines() {
    this.clientOrderService.getOrder(this.orderId).subscribe((res) => {
      if (res != null) {
        this.order = res;
      }
    });
  }

  getArticles() {
    this.articleService.getArticles().subscribe((res) => {
      if (res != null) {
        this.articlesList = res;
      }
    });
  }

  searchArticles() {
    if (this.searchkeyArticle.length === 0) {
      this.filteredArticlesList = [];
    } else {
      this.filteredArticlesList = this.articlesList.filter(
        (art: { code: string; name: string }) =>
          art.code?.toLowerCase().startsWith(this.searchkeyArticle.toLowerCase()) ||
          art.name?.toLowerCase().startsWith(this.searchkeyArticle.toLowerCase())
      );
    }
  }

  removeElementFromList(index: number) {
    if (index != null) {
      this.orderLinesList.splice(index, 1);
    }
  }

  getArticlesByCategory(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = Number(selectElement.value);
    this.categorieService.getArticlesByCategoryId(categoryId).subscribe((res) => {
      if (res != null) {
        this.articles = res.map((element: { image: any; processedImg: string; byteImage: string }) => {
          if (element.byteImage != null) {
            element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
          }
          return element;
        });
      } else {
        this.snackBar.open("Cette Categorie n'as pas d'articles", 'Close', {
          duration: 5000
        });
      }
    });
  }

  getCategories() {
    this.categorieService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  storeSelectedArticle(event: Event) {
    const selectedArticle = event.target as HTMLSelectElement;
    this.selectedArticleId = selectedArticle.value;

    this.articleService.getArticle(this.selectedArticleId).subscribe((res) => {
      if (res != null) {
        this.selectedArticleDispoQuantity = res.dispoQuantity;
        this.isArticleSelected = true;
        this.selectedArticleName = res.name;
      }
    });
  }

  storeSelectedArticleOption2(articleDto: any) {
    const selectedArticle = articleDto;
    this.selectedArticleId = selectedArticle.id;

    console.log(selectedArticle);
    this.articleService.getArticle(this.selectedArticleId).subscribe((res) => {
      if (res != null) {
        this.selectedArticleDispoQuantity = res.dispoQuantity;
        this.isArticleSelected = true;
        this.selectedArticleName = res.name;
      }
    });
  }

  checkDispoQuantity() {
    if (this.selectedQuantity > this.selectedArticleDispoQuantity) {
      this.snackBar.open('La quantité sélectionnée dépasse la quantité disponible.', 'Close', { duration: 5000 });
    }
  }

  addOrderLine() {
    if (this.selectedQuantity <= 0) {
      this.snackBar.open('Veuillez Choisir Une Quantite Pour Cet Article !', 'Close', {
        duration: 5000
      });
    } else {
      this.articleService.getArticle(this.selectedArticleId).subscribe((res) => {
        this.selectedArticle = res;

        const newOrderLine = {
          quantity: Number(this.selectedQuantity),
          articleId: Number(this.selectedArticleId),
          articleCode: this.selectedArticle.code,
          articleName: this.selectedArticle.name
        };

        this.orderLinesList.push(newOrderLine);
        this.resetArticleSelection();
      });
    }
  }

  resetArticleSelection() {
    this.selectedArticleId = null;
    this.selectedArticle = null;
    this.selectedQuantity = 0;
    this.selectedArticleDispoQuantity = null;
    this.isArticleSelected = false;
    this.selectedArticleName = '';
  }

  saveOrder() {
    // const clientOrderDto = {
    //   code: this.order.orderCode,
    //   clientId: Number(this.order.clientId),
    //   clientName: this.order.clientName,
    //   clientOrderLines: this.orderLinesList
    // };
    // this.clientOrderService.addOrder(clientOrderDto).subscribe((res) => {
    //   if (res.id != null) {
    //     this.snackBar.open('Commande Ajoutee Avec Succes !', 'Close', { duration: 5000 });
    //     this.router.navigateByUrl('/get-orders');
    //   }
    // });
  }

  clearOrderLinesList() {
    this.orderLinesList = [];
  }
}

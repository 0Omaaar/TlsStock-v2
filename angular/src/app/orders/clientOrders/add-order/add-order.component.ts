import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { ClientService } from 'src/app/services/clients/client.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [SharedModule, FormsModule, MatIconModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss'
})
export class AddOrderComponent {
  categories: any;
  clients: any;
  category: any = null;
  articles: any;
  client: any = {};
  selectedClient: any = null;
  selectedArticleId: any = null;
  orderCode: string = '';
  clientId: any = null;
  selectedArticle: any = null;
  selectedQuantity: number = 0;
  selectedArticleDispoQuantity: any = null;

  orderLinesList: Array<any> = [];

  currentDate = new Date();
  constructor(
    private categorieService: CategoryService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private clientOrderService: ClientOrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getCategories() {
    this.categorieService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  displayClient(event: Event) {
    const selectedClient = event.target as HTMLSelectElement;
    const clientId = this.selectedClient.id;

    this.orderCode = 'o-' + this.selectedClient.name + '-' + clientId;
  }
  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
    });
  }

  storeSelectedArticle(event: Event) {
    const selectedArticle = event.target as HTMLSelectElement;
    this.selectedArticleId = selectedArticle.value;

    this.articleService.getArticle(this.selectedArticleId).subscribe((res) => {
      if (res != null) {
        this.selectedArticleDispoQuantity = res.dispoQuantity;
        // console.log(this.selectedArticleDispoQuantity);
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

        if (this.selectedClient == null) {
          this.snackBar.open('Veuillez Choisir Un Client !', 'Close', { duration: 5000 });
        } else {
          this.orderLinesList.push(newOrderLine);
          // this.selectedArticleDispoQuantity -= Number(this.selectedQuantity);
        }
      });
    }
  }

  saveOrder() {
    const clientOrderDto = {
      code: this.orderCode,
      clientId: Number(this.selectedClient.id),
      clientName: this.selectedClient.name,
      clientOrderLines: this.orderLinesList
    };
    // console.log(clientOrderDto);
    this.clientOrderService.addOrder(clientOrderDto).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Commande Ajoutee Avec Succes !', 'Close', { duration: 5000 });
        this.router.navigateByUrl("/get-orders");
      }
    });
  }

  clearOrderLinesList() {
    this.orderLinesList = [];
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

  ngOnInit() {
    this.getCategories();
    this.getClients();
  }
}

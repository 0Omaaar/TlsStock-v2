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
  category: any;
  articles: any;
  client: any = {};
  selectedClient: any = null;
  selectedArticleId: any = null;
  orderCode: string = '';
  clientId: any = null;
  selectedArticle: any = null;
  selectedQuantity: number = 0;

  orderLinesList: Array<any> = [];

  currentDate = new Date();
  constructor(
    private categorieService: CategoryService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private clientOrderService: ClientOrderService,
    private snackBar: MatSnackBar
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
  }

  addOrderLine() {
    this.articleService.getArticle(this.selectedArticleId).subscribe((res) => {
      this.selectedArticle = res;

      const newOrderLine = {
        quantity: Number(this.selectedQuantity),
        articleId: Number(this.selectedArticleId),
        articleCode: this.selectedArticle.code,
        articleName: this.selectedArticle.name,
      };

      if (this.selectedClient == null) {
        this.snackBar.open('Veuillez Choisir Un Client !', 'Close', { duration: 5000 });
      } else {
        this.orderLinesList.push(newOrderLine);
      }
    });
  }

  saveOrder(){
    const clientOrderDto = {
      code: this.orderCode,
      // orderStatus: "EN_PREPARATION",
      clientId: Number(this.selectedClient.id),
      clientName: this.selectedClient.name,
      clientOrderLines: this.orderLinesList
    };
    console.log(clientOrderDto);
    this.clientOrderService.addOrder(clientOrderDto).subscribe(res => {
      if(res.id != null){
        this.snackBar.open("Commande Ajoutee Avec Succes !", 'Close', {duration: 5000});
      }
    })
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

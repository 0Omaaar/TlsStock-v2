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
import { NotificationService, Notification } from 'src/app/services/notifications/notification.service';

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
  articlesList: any = [];
  filteredArticlesList: any[] = [];

  isArticleSelected: boolean = false;
  selectedArticleName: string = '';

  searchkeyArticle!: string;

  orderLinesList: Array<any> = [];

  sendNotif: boolean = false;

  currentDate = new Date();
  constructor(
    private categorieService: CategoryService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private clientOrderService: ClientOrderService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notificationService: NotificationService
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

        const dispoQuantity = res.dispoQuantity - this.selectedQuantity;
        if (dispoQuantity <= res.minQuantity) {
          this.sendNotif = true;
        }

        if (this.selectedClient == null) {
          this.snackBar.open('Veuillez Choisir Un Client !', 'Close', { duration: 5000 });
        } else {
          this.orderLinesList.push(newOrderLine);
          this.resetArticleSelection();
        }
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

  addNotification() {
    const newNotification: Notification = {
      id: Date.now(),
      title: 'Nouvelle Notification',
      message: 'Un Article récemment demandé par une commande client approche de son seuil de quantité minimale.',
      timestamp: new Date()
    };
    this.notificationService.addNotification(newNotification);
  }

  saveOrder() {
    const clientOrderDto = {
      code: this.orderCode,
      clientId: Number(this.selectedClient.id),
      clientName: this.selectedClient.name,
      clientOrderLines: this.orderLinesList
    };

    if (this.sendNotif == true) {
      this.addNotification();
    }

    this.clientOrderService.addOrder(clientOrderDto).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Commande Ajoutee Avec Succes !', 'Close', { duration: 5000 });
        this.router.navigateByUrl('/get-orders');
        this.sendNotif = false;
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

  ngOnInit() {
    this.getCategories();
    this.getClients();
    this.getArticles();
  }
}

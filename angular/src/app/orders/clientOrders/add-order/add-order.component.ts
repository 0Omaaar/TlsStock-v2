import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { ClientService } from 'src/app/services/clients/client.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { Router } from '@angular/router';
import { NotificationService, Notification } from 'src/app/services/notifications/notification.service';
import { SousCategoryService } from 'src/app/services/sousCategory/sous-category.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleColorService } from 'src/app/services/articleColors/article-color.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [SharedModule, FormsModule, MatIconModule],
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  categories: any[] = [];
  clients: any[] = [];
  category: any = null;
  articles: any[] = [];
  client: any = {};
  selectedClient: any = null;
  selectedArticleId: any = null;
  orderCode: string = '';
  clientId: any = null;
  selectedArticle: any = null;
  selectedQuantity: number = 0;
  selectedArticleDispoQuantity: any = null;
  articlesList: any[] = [];
  filteredArticlesList: any[] = [];
  storedArticleForColors: any = null;
  storedArticleColor: any = null;
  storedArticleColorId: any = null;

  isArticleSelected: boolean = false;
  selectedArticleName: string = '';
  sousCategories: any[] = [];

  searchkeyArticle!: string;

  orderLinesList: Array<any> = [];

  sendNotif: boolean = false;

  currentDate = new Date();
  currentDateForReturn!: string;
  returnDate: any | null = null;

  constructor(
    private categorieService: CategoryService,
    private clientService: ClientService,
    private articleService: ArticleService,
    private clientOrderService: ClientOrderService,
    private sousCategoryService: SousCategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private notificationService: NotificationService,
    private articleColorService: ArticleColorService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getClients();
    this.getArticles();

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.currentDateForReturn = `${year}-${month}-${day}`;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCategories() {
    this.categorieService.getAllCategories().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.categories = res;
    });
  }

  getClients() {
    this.clientService.getClients().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.clients = res;
    });
  }

  getArticles() {
    this.articleService.getArticles().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.articlesList = res;
      }
    });
  }

  displayClient(event: Event) {
    const selectedClient = event.target as HTMLSelectElement;
    const clientId = this.selectedClient.id;
    this.orderCode = 'o-' + this.selectedClient.name + '-' + clientId;
  }

  storeSelectedArticle(event: Event) {

    this.resetArticleSelection();

    const selectedArticle = event.target as HTMLSelectElement;
    this.selectedArticleId = selectedArticle.value;

    this.articleService.getArticle(this.selectedArticleId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.selectedArticleDispoQuantity = res.dispoQuantity;
        this.isArticleSelected = true;
        this.selectedArticleName = res.name;
        this.storedArticleForColors = res;

      }
    });


  }

  storeSelectedColor(event: Event) {
    const html = event.target as HTMLSelectElement;
    const selectColorArticleId = html.value as any;

    this.articleColorService.getArticleColor(selectColorArticleId).subscribe(res => {
      if (res != null) {
        this.storedArticleColor = res;
        this.storedArticleColorId = res.id;
      }
    })

  }

  storeSelectedArticleOption2(articleDto: any) {
    const selectedArticle = articleDto;
    this.selectedArticleId = selectedArticle.id;


    this.articleService.getArticle(this.selectedArticleId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
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
    if (this.returnDate == null) {
      this.snackBar.open('Veuillez Choisir Une Date de Retour !', 'Close', {
        duration: 5000
      });
    } else if (this.selectedQuantity <= 0) {
      this.snackBar.open('Veuillez Choisir Une Quantite Pour Cet Article !', 'Close', {
        duration: 5000
      });
    } else {
      this.articleService.getArticle(this.selectedArticleId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        this.selectedArticle = res;

        const newOrderLine = {
          quantity: Number(this.selectedQuantity),
          articleId: Number(this.selectedArticleId),
          articleCode: this.selectedArticle.code,
          articleName: this.selectedArticle.name,
          articleColorId: this.storedArticleColorId,
          articleColor: this.storedArticleColor?.color
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
          this.storedArticleColor = null;
          this.storedArticleForColors = null;
          this.storedArticleColorId = null;
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
      clientOrderLines: this.orderLinesList,
      returnDate: this.returnDate
    };

    if (this.sendNotif) {
      this.addNotification();
    }

    this.clientOrderService.addOrder(clientOrderDto).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
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

  getSousCategoriesByCategory(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = Number(selectElement.value);

    this.resetArticleSelection();
    this.sousCategories = [];
    this.articles = [];

    this.categorieService.getSousCategoriesByCategoryId(categoryId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.sousCategories = res;
      } else {
        this.snackBar.open("Pas de Sous Categories pour cette Categorie !", 'Close', { duration: 5000 });
      }
    });
  }

  getArticlesBySousCategory(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sousCategoryId = Number(selectElement.value);

    this.resetArticleSelection();
    this.articles = [];

    this.sousCategoryService.getArticlesBySousCategory(sousCategoryId).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      if (res) {
        this.articles = res;
      } else {
        this.snackBar.open("Pas d'articles pour cette Sous Categorie !", 'Close', { duration: 5000 });
      }
    });
  }

  searchArticles() {
    this.filteredArticlesList = this.articlesList.filter(article =>
      article.name.toLowerCase().includes(this.searchkeyArticle.toLowerCase()) ||
      article.code.toLowerCase().includes(this.searchkeyArticle.toLowerCase())
    );
  }
}

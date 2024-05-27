// Angular Import
import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService, Notification } from 'src/app/services/notifications/notification.service';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { Router, RouterLink } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';
import { ClientService } from 'src/app/services/clients/client.service';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { StockMovementService } from 'src/app/services/stockMovements/stock-movement.service';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent {
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;

  // constructor
  constructor(public notificationService: NotificationService, 
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private clientService: ClientService,
    private clientOrderService: ClientOrderService,
    private stockMovementService: StockMovementService,
    private authService: AuthService,
    private router: Router
  ) {
    this.visibleUserList = false;
    this.chatMessage = false;
  }

  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  clearNotifications() {
    this.notificationService.clearAllNotifications();
  }

  logout() {
    UserStorageService.signOut();
    this.authService.isAuth = false;
    this.router.navigateByUrl('login');
    this.articleService.clearCache();
    this.categoryService.invalidateCache();
    this.clientService.clearCache();
    this.clientOrderService.clearCache();
    this.stockMovementService.clearCache();
  }
}

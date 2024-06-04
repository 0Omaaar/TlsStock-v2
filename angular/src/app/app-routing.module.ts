// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { GetCategoriesComponent } from './categories/get-categories/get-categories.component';
import { ArticleComponent } from './articles/articles/article.component';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { UpdateArticleComponent } from './articles/update-article/update-article.component';
import { TestMaterialComponent } from './test-material/test-material.component';
import { CategoryArticlesComponent } from './categories/category-articles/category-articles.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { AddOrderComponent } from './orders/clientOrders/add-order/add-order.component';
import { GetOrdersComponent } from './orders/clientOrders/get-orders/get-orders.component';
import { EditOrderComponent } from './orders/clientOrders/edit-order/edit-order.component';
import { GetStockMovementsComponent } from './stockMovements/get-stock-movements/get-stock-movements.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SousCategorieComponent } from './sousCategories/sous-categorie/sous-categorie.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      // {
      //   path: 'signup',
      //   component: SignupComponent,
      // },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'categories',
        component: GetCategoriesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'sousCategories',
        component: SousCategorieComponent,
        canActivate: [authGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'articles',
        component: ArticleComponent,
        canActivate: [authGuard],
      },
      {
        path: 'stock-movements',
        component: GetStockMovementsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'get-orders',
        component: GetOrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'ajouterArticle',
        component: AddArticleComponent,
        canActivate: [authGuard],
      },
      {
        path: 'test',
        component: TestMaterialComponent
      },
      {
        path: 'modifierArticle/:id',
        component: UpdateArticleComponent,
        canActivate: [authGuard],
      },
      {
        path: 'modifierCommande/:id',
        component: EditOrderComponent,
        canActivate: [authGuard],
      },
      {
        path: 'categorie/:id/articles',
        component: CategoryArticlesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'add-order',
        component: AddOrderComponent,
        canActivate: [authGuard],
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component'),
        canActivate: [authGuard],
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart & map/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms & tables/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/forms & tables/tbl-bootstrap/tbl-bootstrap.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

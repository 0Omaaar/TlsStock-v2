import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClientService } from 'src/app/services/clients/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';


// interface Order{
//   id: number;
//   orderDate: Date;
//   orderStatus: string;
//   clientName: string;
//   clientId: number;
//   code: string;
//   clientEmail: string;
//   clientPhone: string;
//   clientOrderLines: OrderLine[];
// }

// interface OrderLine{
//   id: number;
//   quantity: number;
//   articleId: number;
//   articleCode: string;
//   articleName: string;
//   orderClientId: number;
// }

@Component({
  selector: 'app-get-orders',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    SharedModule
  ],
  templateUrl: './get-orders.component.html',
  styleUrl: './get-orders.component.scss'
})
export class GetOrdersComponent {

  allOrders: any[] = [];
  currentOrders: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientOrderService: ClientOrderService, 
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  getOrders() {
    this.clientOrderService.getOrders().subscribe((res) => {
      this.allOrders = res;
      this.updateCurrentOrders();
    });
  }

  updateCurrentOrders(pageEvent?: PageEvent) {
    const startIndex = pageEvent ? pageEvent.pageIndex * pageEvent.pageSize : 0;
    const endIndex = startIndex + (pageEvent ? pageEvent.pageSize : 3);
    this.currentOrders = this.allOrders.slice(startIndex, endIndex);
  }

  udpateOrderStatus(orderClientDto: any){

    this.clientOrderService.updateOrderStatus(orderClientDto).subscribe( res => {
      if(res != null){
        this.snackBar.open("Commande Definie Livree !", 'Close', 
          {
            duration: 5000
          }
        );
        this.getOrders();
      }else{
        this.snackBar.open("Erreur Survenue !", 'Close', {duration: 5000});
      }
    })
  }

  ngOnInit() {
    this.getOrders();
  }
}

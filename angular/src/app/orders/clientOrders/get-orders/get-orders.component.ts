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
import { RouterModule } from '@angular/router';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-get-orders',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
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
    private snackBar: MatSnackBar,
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

  generateInvoice(order: any): void {
    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.addImage('/assets/images/tls.png', 'PNG', 14, 10, 50, 50);

    doc.text('COMMANDE CLIENT', 140, 40);

    doc.text('Facture N° ' + order.id, 150, 50).setFontSize(25);

    doc.setFontSize(10);
    doc.text('Créé le : ' + new Date(order.orderDate).toLocaleDateString(), 14, 95);
    doc.text('Status : ' + order.orderStatus, 14, 100);

    doc.text('Client N° ' + order.clientId, 150, 95);
    doc.text('Nom Client : ' + order.clientName, 150, 100);
    doc.text('Email : '+order.clientEmail, 150, 105);

    const orderLines = order.clientOrderLines.map((line: any) => [
      line.articleCode,
      line.articleName,
      line.quantity
    ]);

    const startY = 55;
    autoTable(doc, {
      startY,
      head: [['Code Article', 'Nom Article', 'Quantite']],
      body: orderLines,
      styles: { cellPadding: 2, fontSize: 10 },
      headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
      footStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0] },
    });

  
    doc.save(`facture_client_${order.clientName}_${order.id}.pdf`);
  }
}
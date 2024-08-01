import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manual-order-return',
  standalone: true,
  imports: [SharedModule, MatSlideToggleModule],
  templateUrl: './manual-order-return.component.html',
  styleUrl: './manual-order-return.component.scss'
})
export class ManualOrderReturnComponent {

  orderId!: number;
  order: any;
  orderLines: any;
  confirmations: boolean[] = [];
  quantityTemps: any[] = [];
  disable: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private orderService: ClientOrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrder(this.orderId).subscribe(res => {
      this.order = res;
      this.confirmations = new Array(res.clientOrderLines.length).fill(false);
      this.quantityTemps = res.clientOrderLines.map((line: any) => line.quantity);
    })

  }

  returnOrder(order: any) {
    this.orderService.manualOrderReturn(order).subscribe(
      (res: any) => {
        this.snackBar.open("Commande Definie Comme RETOURNE !", 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl('dashboard')
      },
      (error: any) => {
        this.snackBar.open("Erreur Survenue !", 'Close', {
          duration: 5000
        })
      }
    )
  }

  changeSlideToggle(index: number, checked: boolean) {
    this.confirmations[index] = checked;
    this.disable = !this.confirmations.every(val => val);

  }

}

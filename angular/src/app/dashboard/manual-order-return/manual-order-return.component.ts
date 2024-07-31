import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  disable: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    private orderService: ClientOrderService
  ) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrder(this.orderId).subscribe(res => {
      this.order = res;
      this.confirmations = new Array(res.clientOrderLines.length).fill(false);
    })
  }

  returnOrder(order: any) {
    console.log(this.confirmations);
  }

  changeSlideToggle(index: number, checked: boolean) {
    this.confirmations[index] = checked;
    this.disable = !this.confirmations.every(val => val);

  }

}

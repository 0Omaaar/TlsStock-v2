import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientOrderService } from 'src/app/services/orders/client-order.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-manual-order-return',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manual-order-return.component.html',
  styleUrl: './manual-order-return.component.scss'
})
export class ManualOrderReturnComponent {

  orderId!: number;
  order: any;

  constructor(private activatedRoute: ActivatedRoute,
    private orderService: ClientOrderService
  ) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrder(this.orderId).subscribe(res => {
      this.order = res;
    })
  }
}

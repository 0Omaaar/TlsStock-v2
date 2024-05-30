import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { ClientOrderService } from '../services/orders/client-order.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  lineChart!: Chart;

  constructor(private ordersService: ClientOrderService) {}

  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders) => {
      // console.log(orders);
      const ordersByMonth = this.processOrdersData(orders);
      this.initLineChart(ordersByMonth);
    });
  }

  processOrdersData(orders: any[]): number[] {
    const currentMonth = new Date().getMonth() + 1;
    console.log(currentMonth);
    const ordersCountByMonth = new Array(currentMonth).fill(0);
    orders.forEach((order) => {
      const month = new Date(order.orderDate).getMonth();
      ordersCountByMonth[month]++;
    });

    return ordersCountByMonth;
  }

  initLineChart(data: number[]) {
    this.lineChart = new Chart({
      xAxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      chart: {
        type: 'line'
      },
      title: {
        text: 'Commandes'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Commandes Par Mois',
          data: data
        } as any
      ]
    });
  }

  // lineChart = new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'Patients'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Patients admitted',
  //       data: [10, 2, 3, 6, 9, 17, 20, 10, 5, 2, 16]
  //     } as any
  //   ]
  // });

  // pieChart = new Chart({
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false
  //   },

  //   credits: {
  //     enabled: false
  //   },

  //   plotOptions: {
  //     pie: {
  //       innerSize: '99%',
  //       borderWidth: 10,
  //       borderColor: '',
  //       slicedOffset: 10,
  //       dataLabels: {
  //         connectorWidth: 0
  //       }
  //     }
  //   },

  //   title: {
  //     verticalAlign: 'middle',
  //     floating: true,
  //     text: 'Diseases'
  //   },

  //   legend: {
  //     enabled: false
  //   },

  //   series: [
  //     {
  //       type: 'pie',
  //       data: [
  //         { name: 'COVID 19', y: 1, color: '#eeeeee' },

  //         { name: 'HIV/AIDS', y: 2, color: '#393e46' },

  //         { name: 'EBOLA', y: 3, color: '#00adb5' },
  //         { name: 'DISPORA', y: 4, color: '#eeeeee' },
  //         { name: 'DIABETES', y: 5, color: '#506ef9' }
  //       ]
  //     }
  //   ]
  // });
}

import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { ClientOrderService } from '../services/orders/client-order.service';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { SharedModule } from '../theme/shared/shared.module';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  lineChart!: Chart;
  dashboardDto: any;

  constructor(private ordersService: ClientOrderService, 
    private dashboardService: DashboardService
  ) {}



  ngOnInit() {

    this.getData();



    this.ordersService.getOrders().subscribe((orders) => {
      const ordersByMonth = this.processOrdersData(orders);
      this.initLineChart(ordersByMonth);
    });
  }

  cards = [
    {
      background: 'bg-c-blue',
      title: 'Commandes',
      icon: 'icon-shopping-cart',
      text: 'Commandes Livrées',
      number: '486',
      no: '351'
    },
    {
      background: 'bg-c-green',
      title: 'Total Sales',
      icon: 'icon-tag',
      text: 'This Month',
      number: '1641',
      no: '213'
    },
    {
      background: 'bg-c-yellow',
      title: 'Revenue',
      icon: 'icon-repeat',
      text: 'This Month',
      number: '$42,56',
      no: '$5,032'
    },
    {
      background: 'bg-c-red',
      title: 'Total Profit',
      icon: 'icon-shopping-cart',
      text: 'This Month',
      number: '$9,562',
      no: '$542'
    }
  ];

  getData(){
    this.dashboardService.getData().subscribe(data => {
      console.log(data);
      this.dashboardDto = data;
    })
  }

  processOrdersData(orders: any[]): number[] {
    const currentMonth = new Date().getMonth() + 1;
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

import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { ClientOrderService } from '../services/orders/client-order.service';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { SharedModule } from '../theme/shared/shared.module';

// Define the OrderStatusKey type
type OrderStatusKey = 'LIVREE' | 'EN_PREPARATION' | 'RETURNED';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lineChart!: Chart;
  dashboardDto: any;
  orderStatusPieData: any[] = [];
  pieChart!: Chart;

  constructor(
    private ordersService: ClientOrderService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getData();
    this.ordersService.getOrders().subscribe((orders) => {
      const ordersByMonth = this.processOrdersData(orders);
      this.initLineChart(ordersByMonth);
    });
  }

  getData() {
    this.dashboardService.getData().subscribe((data) => {
      this.dashboardDto = data;
      this.setupOrderStatusPieData();
      this.initPieChart();
    });
  }

  setupOrderStatusPieData(): void {
    const statusCounts: { [key in OrderStatusKey]: number } = {
      LIVREE: this.dashboardDto.totalShippedOrders,
      EN_PREPARATION: this.dashboardDto.totalPreparationOrders,
      RETURNED: this.dashboardDto.totalReturnedOrders
    };

    this.orderStatusPieData = (Object.keys(statusCounts) as OrderStatusKey[]).map((status) => {
      return {
        name: status,
        y: statusCounts[status],
        color: this.getStatusColor(status)
      };
    });
    console.log(this.orderStatusPieData);
  }

  getStatusColor(status: OrderStatusKey): string {
    switch (status) {
      case 'LIVREE':
        return '#00adb5';
      case 'EN_PREPARATION':
        return '#506ef9';
      case 'RETURNED':
        return '#393e46';
      default:
        return '#eeeeee';
    }
  }

  initPieChart() {
    this.pieChart = new Chart({
      chart: {
        type: 'pie',
        plotShadow: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '99%',
          borderWidth: 10,
          borderColor: '',
          slicedOffset: 10,
          dataLabels: {
            connectorWidth: 0
          }
        }
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: 'Distribution De </br> Commandes Par Statut',
        align: 'center',
        style: {
          color: '#333333',
          fontSize: '14px',
          whiteSpace: 'normal',
          textAlign: 'center',
          margin: 'auto'
        }
      },
      legend: {
        enabled: false
      },
      series: [
        {
          type: 'pie',
          data: this.orderStatusPieData
        }
      ]
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
}

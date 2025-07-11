import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { SelectTileComponent } from "../../../common/utilities/select-tile/select-tile.component";
import { CommonModule } from '@angular/common';
import { RecurringTableComponent } from "../../tables/recurring-table/recurring-table.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RecurringTableComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  chart: any = [];
  filterTabs: any[] = ['1Week', '1Month', '6Months', '1Year', 'Custom'];
  activeTab: any = '1Week';
  constructor() {};

  ngOnInit() {
    this.chart = new Chart('canvas1', {
      type: 'line',
      data: {
        labels: ['10', '20', '30', '40', '50', '60'],
        datasets: [
          {
            label: 'Txsn Count',
            data: [10, 5, 8, 15, 20, 3],
            borderWidth: 2,
            borderColor: '#A4CAFE'
          },
          {
            label: 'Txns Volume',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 2,
            borderColor: '#034EA2'
          }
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 2 
          },
          point: {
            radius: 0 
          }
        },
        plugins: {
          legend:{
            display: false
          }
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          },
        },
      },
    });
    this.chart = new Chart('canvas2', {
      type: 'line',
      data: {
        labels: ['10', '20', '30', '40', '50', '60'],
        datasets: [
          {
            label: 'Txns Count',
            data: [10, 5, 8, 15, 20, 3],
            borderWidth: 2,
            borderColor: '#A4CAFE'
          },
          {
            label: 'Txns Volume',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 2,
            borderColor: '#034EA2'
          }
        ],
      },
      options: {
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0
          }
        },
        plugins: {
          legend:{
            display: false
          }
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          },
        },
      },
    });
  }
  setTab(tab: any) {
    this.activeTab = tab;
  }
}

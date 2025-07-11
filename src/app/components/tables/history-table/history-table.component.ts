import { Component } from '@angular/core';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent {
  transactions = [
    { id: 1, amount: 200, date: '2025-11-25T10:00:00Z' },
    { id: 2, amount: 300, date: '2025-11-25T14:20:00Z' },
    { id: 3, amount: 100, date: '2025-11-24T09:30:00Z' },
    { id: 4, amount: 500, date: '2025-11-23T12:45:00Z' },
  ];

  groupedTransactions: { date: string; transactions: any[] }[] = [];

  ngOnInit() {
    this.groupTransactionsByDate();
  }

  groupTransactionsByDate() {
    const map = new Map<string, any[]>();

    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    this.transactions.forEach((tx) => {
      const dateObj = new Date(tx.date);
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString('default', { month: 'short' });
      const year = dateObj.getFullYear();
      const formattedDate = `${getOrdinal(day)} ${month}, ${year}`;

      if (!map.has(formattedDate)) {
        map.set(formattedDate, []);
      }

      map.get(formattedDate)?.push(tx);
    });

    this.groupedTransactions = Array.from(map.entries()).map(([date, transactions]) => ({
      date,
      transactions,
    }));
  }
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statement-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement-table.component.html',
  styleUrl: './statement-table.component.scss'
})
export class StatementTableComponent {
  headerData: any[] = ['DATE', 'REFERENCE', 'NARRATION', 'TYPE', 'AMOUNT', 'BALANCE'];
  constructor(public router: Router) {}
  rowClick() {
  }
}

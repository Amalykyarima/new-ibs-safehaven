import { Component } from '@angular/core';
import { FilterComponent } from "../../../components/filter/filter.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { CommonModule } from '@angular/common';
import { StatementTableComponent } from "../../../components/tables/statement-table/statement-table.component";

@Component({
  selector: 'app-statements',
  standalone: true,
  imports: [FilterComponent, ButtonFilledComponent, CommonModule, StatementTableComponent],
  templateUrl: './statements.component.html',
  styleUrl: './statements.component.scss'
})
export class StatementsComponent {
activeFilters: any[] = [];
}

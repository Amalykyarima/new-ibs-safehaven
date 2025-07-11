import { Component } from '@angular/core';
import { FilterComponent } from "../../filter/filter.component";
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";
import { StatementTableComponent } from "../../tables/statement-table/statement-table.component";
import { PaginationComponent } from "../../pagination/pagination.component";

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [FilterComponent, StatementTableComponent, PaginationComponent],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss'
})
export class StatementComponent {
  page = 1;

  onPageChange(newPage: number) {
    this.page = newPage;
  }
}

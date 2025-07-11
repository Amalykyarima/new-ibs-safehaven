import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();
  dropdownOpen: boolean = false;

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];

    if (this.totalPages <= 6) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(
          1,
          '...',
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages
        );
      } else {
        pages.push(1, '...', this.currentPage, '...', this.totalPages);
      }
    }

    return pages;
  }

  changePage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
  openDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}

import { Component } from '@angular/core';
import { SearchComponent } from "../../../common/utilities/search/search.component";

@Component({
  selector: 'app-bank-select',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './bank-select.component.html',
  styleUrl: './bank-select.component.scss'
})
export class BankSelectComponent {

}

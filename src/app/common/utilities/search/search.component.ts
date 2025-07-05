import { Component, Input } from '@angular/core';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
@Input() height: string = '60px';
}

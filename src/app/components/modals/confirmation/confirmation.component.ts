import { Component, Input } from '@angular/core';
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [ButtonFilledComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
@Input() title: string = '';
@Input() message: string = '';
}

import { Component, Input } from '@angular/core';
import { ButtonFilledComponent } from "../../../common/utilities/button-filled/button-filled.component";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ButtonFilledComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
@Input() title: string = '';
@Input() message: string = '';
}

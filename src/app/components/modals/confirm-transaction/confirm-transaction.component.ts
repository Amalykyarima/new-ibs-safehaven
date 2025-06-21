import { Component } from '@angular/core';
import { AvatarIconComponent } from "../../../common/utilities/avatar-icon/avatar-icon.component";
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";

@Component({
  selector: 'app-confirm-transaction',
  standalone: true,
  imports: [AvatarIconComponent, SwitchComponent],
  templateUrl: './confirm-transaction.component.html',
  styleUrl: './confirm-transaction.component.scss'
})
export class ConfirmTransactionComponent {

}

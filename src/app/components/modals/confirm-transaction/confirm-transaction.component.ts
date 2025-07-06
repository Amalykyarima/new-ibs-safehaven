import { Component, Input } from '@angular/core';
import { AvatarIconComponent } from "../../../common/utilities/avatar-icon/avatar-icon.component";
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-transaction',
  standalone: true,
  imports: [AvatarIconComponent, SwitchComponent, CommonModule],
  templateUrl: './confirm-transaction.component.html',
  styleUrl: './confirm-transaction.component.scss'
})
export class ConfirmTransactionComponent {
@Input() type: string = '';
}

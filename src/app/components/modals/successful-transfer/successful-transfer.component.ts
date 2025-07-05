import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from "../../../common/utilities/button/button.component";

@Component({
  selector: 'app-successful-transfer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './successful-transfer.component.html',
  styleUrl: './successful-transfer.component.scss'
})
export class SuccessfulTransferComponent {
  onSubmit(){}
}

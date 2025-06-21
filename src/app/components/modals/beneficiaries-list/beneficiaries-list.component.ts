import { Component } from '@angular/core';
import { AvatarIconComponent } from "../../../common/utilities/avatar-icon/avatar-icon.component";

@Component({
  selector: 'app-beneficiaries-list',
  standalone: true,
  imports: [AvatarIconComponent],
  templateUrl: './beneficiaries-list.component.html',
  styleUrl: './beneficiaries-list.component.scss'
})
export class BeneficiariesListComponent {

}

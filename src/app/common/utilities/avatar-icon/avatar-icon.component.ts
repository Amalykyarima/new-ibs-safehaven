import { Component } from '@angular/core';
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: 'app-avatar-icon',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './avatar-icon.component.html',
  styleUrl: './avatar-icon.component.scss'
})
export class AvatarIconComponent {

}

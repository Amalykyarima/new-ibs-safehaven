import { Component } from '@angular/core';
import { SwitchComponent } from "../../../common/utilities/switch/switch.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SwitchComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}

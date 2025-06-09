import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

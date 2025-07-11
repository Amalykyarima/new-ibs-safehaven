import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeTableComponent } from "../../../components/tables/home-table/home-table.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
cards: any[] = [];
frequentTransfers: any[] = [];

}

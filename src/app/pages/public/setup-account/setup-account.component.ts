import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateAccountLayoutComponent } from "../../../layouts/create-account-layout/create-account-layout.component";

@Component({
  selector: 'app-setup-account',
  standalone: true,
  imports: [CommonModule, RouterModule, CreateAccountLayoutComponent],
  templateUrl: './setup-account.component.html',
  styleUrl: './setup-account.component.scss'
})
export class SetupAccountComponent {

}

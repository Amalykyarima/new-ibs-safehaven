import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OverviewComponent } from "../../../components/account/overview/overview.component";
import { DocumentsComponent } from "../../../components/account/documents/documents.component";
import { StatementComponent } from "../../../components/account/statement/statement.component";
import { SettingsComponent } from "../../../components/account/settings/settings.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, OverviewComponent, DocumentsComponent, StatementComponent, SettingsComponent],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
  tabs: string[] = ['Overview', 'Statement', 'Documents', 'Settings'];
  activeTab: string = '';
  constructor(private router: Router){
    this.activeTab = this.tabs[0];
  }
  setTab(value: string){
    this.activeTab = value;
  }
  goBack(){
    this.router.navigate(['/dashboard/accounts']);
  }
}

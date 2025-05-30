import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-onboarding-pages',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule  ],
  templateUrl: './onboarding-pages.component.html',
  styleUrl: './onboarding-pages.component.scss'
})
export class OnboardingPagesComponent {

}

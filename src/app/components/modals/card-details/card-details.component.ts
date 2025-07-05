import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpinningLoaderComponent } from "../../../common/utilities/spinning-loader/spinning-loader.component";

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule, SpinningLoaderComponent],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss'
})
export class CardDetailsComponent {
  loading: boolean = true;

  ngOnInit() {
    this.showAfterDelay();
  }
  
  showAfterDelay() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }
}

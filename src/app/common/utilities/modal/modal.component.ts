import { Component, inject, Input } from '@angular/core';
import { DisplayStore } from '../../../stores/display.store';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

 readonly store = inject(DisplayStore);
  close() {
    this.store.closeModal();
  }
}

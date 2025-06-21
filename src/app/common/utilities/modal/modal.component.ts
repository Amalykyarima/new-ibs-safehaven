import { Component, computed, inject, Input } from '@angular/core';
import { DisplayStore } from '../../../stores/display.store';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

 readonly store = inject(DisplayStore);  activeModal = computed(() => {
  const modals = this.store.modals();
  return Object.keys(modals).find((key) => modals[key]);
});

handleClose() {
  const modalKey = this.activeModal();
  if (modalKey) {
    this.store.closeModal(modalKey);
  }
}

}

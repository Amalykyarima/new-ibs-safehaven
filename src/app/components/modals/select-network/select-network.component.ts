import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-network',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-network.component.html',
  styleUrl: './select-network.component.scss'
})
export class SelectNetworkComponent {
networks: any[] = [
  {name: 'Airtel', icon: '../../../../assets/images/airtel.svg'},
  {name: 'Glo', icon: '../../../../assets/images/glo.svg'},
  {name: 'MTN', icon: '../../../../assets/images/mtn.svg'},
  {name: '9mobile', icon: '../../../../assets/images/9mobile.svg'}
]
selectedNetwork: string = 'Airtel';
@Output() selectNetwork = new EventEmitter<{ name: string; icon: string }>();

setNetwork(network: { name: string; icon: string }) {
  this.selectedNetwork = network.name;
  this.selectNetwork.emit(network);
}
}

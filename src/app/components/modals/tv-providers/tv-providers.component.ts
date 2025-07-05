import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tv-providers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-providers.component.html',
  styleUrl: './tv-providers.component.scss'
})
export class TvProvidersComponent {
networks: any[] = [
  {name: 'DSTV', icon: '../../../../assets/images/airtel.svg'},
  {name: 'STarTimes', icon: '../../../../assets/images/glo.svg'},
  {name: 'GoTV', icon: '../../../../assets/images/mtn.svg'},
  {name: '9mobile', icon: '../../../../assets/images/9mobile.svg'}
]
selectedNetwork: string = 'Airtel';
@Output() selectNetwork = new EventEmitter<{ name: string; icon: string }>();

setNetwork(network: { name: string; icon: string }) {
  this.selectedNetwork = network.name;
  this.selectNetwork.emit(network);
}
}

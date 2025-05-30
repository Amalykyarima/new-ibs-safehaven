import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface SubMenuItem {
  name: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() items: { icon: string; label: string; active: boolean }[] = [];
  // @Input() items: { label: string; icon: string }[] = [];

  // @Input() items: any[] = [];
// @Input() activeDropdownItem: string = '';
@Input() set activeDropdownItem(value: string) {
  this._activeDropdownItem = value;
  this.updateActiveItem(value);
}
get activeDropdownItem(): string {
  return this._activeDropdownItem;
}
private _activeDropdownItem: string = '';
updateActiveItem(itemLabel: string) {
  this.items = this.items.map(item => ({
    ...item,
    active: item.label === itemLabel
  }));
}


  // activeDropdownItem: string = '';
  // iconMap: Record<string, string> = {};

  ngOnInit(): void {
    console.log('bb', this.activeDropdownItem)
    // Dynamically resolve the icon paths from the string identifiers
    this.iconMap = this.items.reduce((map, item) => {
      map[item.icon] = `assets/icons/topup/${item.icon}.svg`;
      return map;
    }, {} as Record<string, string>);
  }

  // setActiveDropdown(itemLabel: string) {
  //   this.activeDropdownItem = itemLabel;
  // }

  setActiveDropdown(itemLabel: string) {
    this.activeDropdownItem = itemLabel;

    // Update the active flag for icons
    this.items = this.items.map(item => ({
      ...item,
      active: item.label === itemLabel
    }));
  }


  iconMap: { [key: string]: string } = {
    // replace these with actual mappings
    'Buy Airtime': 'path-to-default.svg',
    'Buy Airtime-active': 'path-to-active.svg',
    'airtime': 'path-to-default.svg',
    'airtime-active': 'path-to-active.svg',
    // ...
  };
}

import { CommonModule } from '@angular/common';
// import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() placeholderText: string = '';
  @Input() placeholderHelper: string = '';
  // @Input() options: string[] = [];
  @Input() error: string = '';
  @Input() custom: boolean = false;
  @Input() customValue: boolean = false;
  @Input() options: any[] = [];
  @Input() option: any;
  @Input() selectedOption: string = '';



  @Output() optionSelected = new EventEmitter<string>();

  @ContentChild(TemplateRef) customContent!: TemplateRef<any>;
animate: boolean = false;
  showDropdown: boolean = false;
  // selectedOption: string = '';

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  getVissibility = () => {
    if (this.selectedOption !== '') {
      setTimeout(() => {
        this.animate = true;
      }, 100);
    } else {
      this.animate = false;
    }
  };

  selectOption(option: string): void {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.showDropdown = false;
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent implements OnChanges {
  @Input() label: string = '';
  @Input() isChecked: boolean = false;
  @Output() isCheckedChange = new EventEmitter<boolean>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isChecked']) {
      this.isChecked = changes['isChecked'].currentValue;
      console.log(this.isChecked)
    }
  }

  checkItem() {
    this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }
}

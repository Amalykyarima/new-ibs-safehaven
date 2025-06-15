import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
// import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [NzDatePickerModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Input() label = '';
  @Input() error = '';
  @Output() returnValue: EventEmitter<any> = new EventEmitter<string>();
  date: string = '';
  onChange(result: Date): void {
      this.date = new Date(result)
          .toISOString()
          .slice(0, 10);
    this.returnValue.emit(this.date);
  }
}

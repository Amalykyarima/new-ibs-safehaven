import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';
// import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule, NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, NzDatePickerModule, NzRadioModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  constructor() {}

  // today?: any;
  ngOnInit() {
    // Gets today's date in YYYY-MM-DD format

    if (this.selectedDate) {
      this.selectedDate = moment(this.selectedDate).format();
      this.formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
    }
  }
  @Input() selectedDate: string | null = null;
  @Input() max = '';
  @Input() label = '';
  @Input() error = '';

  // @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  formattedDate: any = null;
  @Input() date = moment().format('YYYY-MM-DD');
  @Output() selectDate: EventEmitter<any> = new EventEmitter<any>();

  onChange(result: Date): void {
    this.selectDate.emit(result);
  }

  handleChange = (e: any) => {
    // this.selectedDate = e;
    console.log('Selected date:', e);
    this.error = '';
    console.log(e);
    this.formattedDate = moment(e).format('YYYY-MM-DD');
    console.log('formattedDate :', this.formattedDate);

    // this.onChange.emit(e);
  };
}

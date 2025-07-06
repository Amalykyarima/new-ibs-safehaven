// import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
// import { CalendarModule } from 'primeng/calendar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [NzDatePickerModule, FormsModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Input() selectedDate: string | null = null;

  @Input() label = '';
  @Input() error = '';
  @Input() max = '';
  @Output() returnValue: EventEmitter<any> = new EventEmitter<string>();
  date: string = '';
  // onChange(result: Date): void {
  //     this.date = new Date(result)
  //         .toISOString()
  //         .slice(0, 10);
  //   this.returnValue.emit(this.date);
  // }
    // today?: any;
    ngOnInit() {
      // Gets today's date in YYYY-MM-DD format

      if (this.selectedDate) {
        this.selectedDate = moment(this.selectedDate).format();
        //(this.selectedDate);
        this.formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
      }
    }

    @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
    formattedDate: any = null;

    handleChange = (e: any) => {
      this.error = '';
      console.log(e);
      this.formattedDate = moment(e).format('YYYY-MM-DD');
      this.onChange.emit(e);
    };
}

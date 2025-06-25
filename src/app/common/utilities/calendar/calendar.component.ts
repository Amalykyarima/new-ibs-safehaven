import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import moment from 'moment';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
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
      //(this.selectedDate);
      this.formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
    }
  }
  @Input() selectedDate: string | null = null;
  @Input() max = '';
  @Input() label = '';
  @Input() error = '';

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  formattedDate: any = null;

  handleChange = (e: any) => {
    this.error = '';
    console.log(e);
    this.formattedDate = moment(e).format('YYYY-MM-DD');
    this.onChange.emit(e);
  };
}

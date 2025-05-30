import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OtpInputComponent } from "../otp-input/otp-input.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [CommonModule, OtpInputComponent, RouterModule],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss'
})
export class PinComponent {


  constructor() { }

  ngOnInit(): void {
  }

 error = '';
  pin = '';

  @Input() loginData:any = {}
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  verifyPin = () => {
    this.error = 'Invalid otp';
  };
  onPinChange = (event: any) => {
    this.error = '';
    this.pin = event;
  };

  close_ = () => this.close.emit();
}

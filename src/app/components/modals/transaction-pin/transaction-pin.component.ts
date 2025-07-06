import { Component } from '@angular/core';
import { PinComponent } from "../../../common/utilities/pin/pin.component";
import { OtpComponent } from "../../../common/utilities/otp/otp.component";
import { OtpInputComponent } from "../../../common/utilities/otp-input/otp-input.component";

@Component({
  selector: 'app-transaction-pin',
  standalone: true,
  imports: [OtpInputComponent],
  templateUrl: './transaction-pin.component.html',
  styleUrl: './transaction-pin.component.scss'
})
export class TransactionPinComponent {

}

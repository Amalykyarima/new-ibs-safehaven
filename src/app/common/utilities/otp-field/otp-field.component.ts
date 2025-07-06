import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-field.component.html',
  styleUrl: './otp-field.component.scss',
})
export class OtpFieldComponent
  implements OnChanges, OnInit, ControlValueAccessor {

    @Input() length = 6;
    @Output() onInputChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChildren('otpInputs') otpInputs!: QueryList<ElementRef>;


    otp: string[] = new Array(this.length).fill('');
    pinConfig: any = {};

  ngOnInit(): void {
    this.initializePinConfig();

  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  initializePinConfig(hasError: boolean = false) {
    this.pinConfig = {
      length: this.length,
      disableAutoFocus: true,
      allowNumbersOnly: true,
      isPasswordInput: true,
      inputClass: 'border-none',
      containerClass:
        'flex items-center sm:gap-[20px] gap-[14px] justify-between w-full',
      inputStyles: {
        'min-height': '52px',
        'min-width': '42px',
        background: '#F4F5F7',
        'border-radius': '10px',
        color: hasError ? 'red' : '#034EA2',
        border: hasError ? '1px solid red' : 'none',
      },
    };
  }

  onPINChange = (event: any) => {
    if (event.length === this.length) {
      this.pinConfig.inputStyles.color = '#034EA2';
      this.pinConfig.inputStyles.border = 'none';
      // this.onChange.emit(event);
    }
  };




  get otpArray() {
    return new Array(this.length);
  }
  onChange = (value: string) => {
    this.onInputChange.emit(value);
  };
  onTouched = () => { };

  writeValue(value: string): void {
    if (value) {
      this.otp = value.split('').slice(0, this.length);
    } else {
      this.otp = new Array(this.length).fill('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    if (/[^0-9]/.test(value)) {
      input.value = '';
      return;
    }

    this.otp[index] = value;
    this.onChange(this.otp.join(''));

    if (value && index < this.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const otpArray = pasteData.slice(0, this.length).split('');

    this.otp = otpArray.concat(
      new Array(this.length - otpArray.length).fill('')
    );
    this.onChange(this.otp.join(''));

    setTimeout(() => {
      this.otpInputs.get(otpArray.length - 1)?.nativeElement.focus();
    }, 0);
  }
}

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  showDropdown = false;
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.options = changes['options'].currentValue;
      // console.log('this.options', this.options);
    }
    if (changes['option']) {
      this.option = changes['option'].currentValue
      this.selectedValue = this.option.value;
      // console.log(this.option)
    }
  }

  @Input() option: any = {};
  @Input() options: any[] = [];
  @Input() type: any = '';
  @Input() label: any = '';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' = 'medium';
  @Input() placeholder: any = '';
  @Input() className: any = '';
  @Input() custom: boolean = false;
  @Input() error: any = '';
  @Input() customValue: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  selectedValue: string | null = null;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  selectOption = (value: any) => {
    this.selectedValue = value;
    const selectedOption = this.options.find((opt) => opt.value === value);

    if (selectedOption) {
      this.onChange(selectedOption);
      this.onTouched();
      this.select.emit(selectedOption);
    }
  };
  writeValue(obj: { name: string; value: string } | null): void {
    if (obj) {
      this.selectedValue = obj.value;
    } else {
      this.selectedValue = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

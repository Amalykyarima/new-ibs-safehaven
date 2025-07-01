import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GeneralService } from '../../../resources/services/general.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnChanges, AfterViewInit {
  constructor(
    private generalService: GeneralService,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}
  @Input() newCustom: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() error: string = '';
  @Input() phone: boolean = false;
  @Input() countryCode: string = '234';
  @Input() flag: string = '🇳🇬';
  // @Input() countries: any[] = [
  //   { name: 'Nigeria', callingCodes: ['234'], flag: '🇳🇬' },
  //   { name: 'Ghana', callingCodes: ['233'], flag: '🇬🇭' },
  //   { name: 'Kenya', callingCodes: ['254'], flag: '🇰🇪' },
  // ];
  countries: any = [];


  @Input() autoFocus: boolean = false;
  @Output() onChange = new EventEmitter<string>();
  @Output() getCountryCode = new EventEmitter<string>();
  @Output() submit = new EventEmitter<void>();

  showDropdown = false;
  animate = false;
  @ViewChild('inputElement') inputElement!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue;
    }
    if (changes['error']) {
      this.error = changes['error'].currentValue;
    }
    if (changes['phone']) this.getCountries();
    this.getVissibility();

  }

  ngAfterViewInit() {
    // const observer = new MutationObserver(() => {
    //   const autofilledValue = this.inputElement?.nativeElement?.value;
    //   if (autofilledValue) {
    //     this.ngZone.run(() => {
    //       // console.log('Autofilled value detected:', autofilledValue);
    //       // this.value = autofilledValue; // Update model manually
    //       this.handleChange({ target: { value: this.value } });
    //     });
    //   }
    // });

    // // Observe changes to attributes and child elements of the input element
    // observer.observe(this.inputElement.nativeElement, {
    //   attributes: true,
    //   childList: true,
    //   subtree: true,
    // });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['value']) {
  //     this.value = changes['value'].currentValue;
  //   }
  //   if (changes['error']) {
  //     this.error = changes['error'].currentValue;
  //   }
  //   // if (changes['phone']) this.getCountries();
  // }

  handleInputChange(event: any) {
    console.log(event, 'event');
    this.onChange.emit(this.value);
    this.getVissibility();
  }

  onEnterKey() {
    this.submit.emit();
  }

  // selectCountryCode(val: string) {
  //   const [code, flag] = val.split('+');
  //   this.countryCode = code;
  //   this.flag = flag;
  //   this.getCountryCode.emit(code);
  // }

  // getCountries = async () => {
  //   try {
  //     this.countries = await this.generalService.getAllCountries().toPromise();
  //     const code = this.countries.filter(
  //       (c: any) => c.callingCodes[0] === this.countryCode
  //     );
  //     // console.log(this.countries);
  //     this.flag = code[0].flag;
  //     //(code);
  //   } catch (err) {}
  // };

  getVissibility = () => {
    if (this.value !== '') {
      setTimeout(() => {
        this.animate = true;
      }, 100);
    } else {
      this.animate = false;
    }
  };

  handleChange = (e: any) => {
    const val = e?.target?.value?.toString();

    if (this.maxLength !== null && this.value.length >= this.maxLength) {
      //(this.value.slice(0, this.maxLength));
      this.value = val.slice(0, this.maxLength);
    } else {
      if (this.label === 'Company Name') {
        let regex = /[^a-zA-Z0-9 .,'&,@-]/g;
        this.value = val.replace(regex, '').replaceAll('&', ' And ');
      } else if (this.phone) {
        // console.log('test');
        // console.log(this.value);
        this.value = this.value?.replace(/[^0-9.]/g, '');
      } else this.value = val;
    }

    this.onChange.emit(this.value);
  };
  getCountries = async () => {
    try {
      this.countries = await this.generalService.getAllCountries().toPromise();
      const code = this.countries.filter(
        (c: any) => c.callingCodes[0] === this.countryCode
      );
      // console.log(this.countries);
      this.flag = code[0].flag;
      //(code);
    } catch (err) {}
  };
  item: any;
  selectCountryCode = (c: any) => {
    // console.log(c);
    this.countryCode = c.slice(0, c.indexOf('+'));
    this.flag = c.slice(c.indexOf('+') + 1);
    this.getCountryCode.emit('+' + this.countryCode);
    this.showDropdown = false;
  };
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  submit_ = () => {
    // console.log('test');
    this.submit.emit();
  };
  checkValue(event: any) {
    // console.log('event', event.target.value);
    this.handleChange(event ? event?.target?.value : this.value);
  }
}

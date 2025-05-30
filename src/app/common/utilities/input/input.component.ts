import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent  {

    @Input() maxLength: number | null = null;
    @Input() type: string = 'text';
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() value: string = '';
    @Input() error: string = '';
    @Input() phone: boolean = false;
    @Input() countryCode: string = '234';
    @Input() flag: string = '🇳🇬';
    @Input() countries: any[] = [
      { name: 'Nigeria', callingCodes: ['234'], flag: '🇳🇬' },
      { name: 'Ghana', callingCodes: ['233'], flag: '🇬🇭' },
      { name: 'Kenya', callingCodes: ['254'], flag: '🇰🇪' }
    ];

    @Input() autoFocus: boolean = false;
    @Output() onChange = new EventEmitter<string>();
    @Output() getCountryCode = new EventEmitter<string>();
    @Output() submit = new EventEmitter<void>();

    showDropdown = false;

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['value']) {
        this.value = changes['value'].currentValue;
      }
      if (changes['error']) {
        this.error = changes['error'].currentValue;
      }
      // if (changes['phone']) this.getCountries();
    }

    handleInputChange(event: any) {
      console.log(event, 'event')
      this.onChange.emit(this.value);
    }


    onEnterKey() {
      this.submit.emit();
    }

    selectCountryCode(val: string) {
      const [code, flag] = val.split('+');
      this.countryCode = code;
      this.flag = flag;
      this.getCountryCode.emit(code);
    }

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
  }

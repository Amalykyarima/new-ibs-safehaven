import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchComponent } from "../../utilities/search/search.component";
import { InputComponent } from "../../utilities/input/input.component";
import { DatepickerComponent } from "../../utilities/datepicker/datepicker.component";
import { SelectComponent } from "../../utilities/select/select.component";
import { ButtonFilledComponent } from "../../utilities/button-filled/button-filled.component";

@Component({
  selector: 'app-setup-profile-corporate',
  standalone: true,
  imports: [CommonModule, SearchComponent, InputComponent, DatepickerComponent, SelectComponent, ButtonFilledComponent],
  templateUrl: './setup-profile-corporate.component.html',
  styleUrl: './setup-profile-corporate.component.scss'
})
export class SetupProfileCorporateComponent {
  @Input() step = 0;
  @Input() totalSteps = 0;
  @Output() stepChange = new EventEmitter<number>();
  searchCompany: boolean = true;

  searchCompanyToggle() {
    this.searchCompany = !this.searchCompany
  }

  next=()=> {
    if (this.step < this.totalSteps - 1) {
      this.stepChange.emit(this.step + 1);
    }
  }

  back() {
    if (this.step > 0) {
      this.stepChange.emit(this.step - 1);
    }
  }
}

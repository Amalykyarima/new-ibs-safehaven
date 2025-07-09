import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarIconComponent } from "../../../common/utilities/avatar-icon/avatar-icon.component";
import { TransferService } from '../../../resources/services/transfer.service';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../../common/utilities/search/search.component";


@Component({
  selector: 'app-beneficiaries-list',
  standalone: true,
  imports: [CommonModule, AvatarIconComponent, SearchComponent],
  templateUrl: './beneficiaries-list.component.html',
  styleUrl: './beneficiaries-list.component.scss'
})
export class BeneficiariesListComponent implements OnInit {

  filteredBeneficiaries: Array<any> = [];
  filteredList: Array<any> = [];
  deletingBen: any = '';
  @Input() beneficiaries: Array<any> = [];
  @Input() toggleModal: boolean = false;
  @Output() toggleModalChange: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedBeneficiary: any = null;
  @Output() selectedBeneficiaryChange: EventEmitter<any> = new EventEmitter();
  @Output() beneficiaryDeleted: EventEmitter<any> = new EventEmitter();

  constructor(private transferService: TransferService) {
    this.filteredList = this.beneficiaries.filter((item: any) => {
      return item._id != this.selectedBeneficiary?._id;
    });
  }


  ngOnInit(): void {
    console.log(' ngOnInit beneficiaries', this.filteredList)

  }


  ngOnChanges():void {
    this.filteredList = this.beneficiaries.filter((item: any) => {
      return item._id != this.selectedBeneficiary?._id;
    });
  }

  // ngOnChanges() {
  //   this.filterBeneficiaries();
  // }

  filterBeneficiaries() {
    this.filteredBeneficiaries = this.beneficiaries;
  }

  selectItem(item: any): void {
    console.log('selectItem Beneficiary')
    this.selectedBeneficiary = item;
    this.selectedBeneficiaryChange.emit(this.selectedBeneficiary);
    setTimeout(() => {
      this.toggleModal = false;
      this.toggleModalChange.emit(this.toggleModal);
    }, 200);
  }

  unselectItem() {
    this.selectedBeneficiary = {};
    this.selectedBeneficiaryChange.emit(this.selectedBeneficiary);
    setTimeout(() => {
      this.toggleModal = false;
      this.toggleModalChange.emit(this.toggleModal);
    }, 200);
  }

  handleCancel(): void {
    this.toggleModal = false;
    this.toggleModalChange.emit(this.toggleModal);
  }

  filterList(event: any): void {
    console.log('filterList')
    let query = ((event.target as HTMLInputElement).value).toLowerCase();
    if (query == '') {
      this.filteredList = this.beneficiaries.filter((item: any) => {
        return item._id != this.selectedBeneficiary?._id;
      });
    }
    else {
      this.filteredList = this.beneficiaries.filter((item: any) => {
        let name = item.accountName.toLowerCase();
        let accNo = item.accountNumber.toLowerCase();
        let bank = item.bank.toLowerCase();
        return name.includes(query) || accNo.includes(query) || bank.includes(query);
      })
    }
  }

  deleteBeneficiary(event: any) {
    console.log('deleteBeneficiary')
    this.deletingBen = event._id;
    this.transferService.removeBeneficiaries(event._id).subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          this.deletingBen = '';
          this.beneficiaryDeleted.emit(res);
          setTimeout(() => {
            this.toggleModal = false;
            this.toggleModalChange.emit(this.toggleModal);
          }, 200);
        }
        else {
          this.deletingBen = '';
        }
      }
    )
  }
}

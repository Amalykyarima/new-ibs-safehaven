import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../../resources/services/auth.service';
import { GeneralService } from '../../../resources/services/general.service';
import { AvatarComponent } from "../../../common/utilities/avatar/avatar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


declare var Headway: any;


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,AvatarComponent, RouterModule, NzDropDownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  emailVerified: boolean = true
  @Input() openSideBar: boolean = false;
  @Input() currentUser: any = {};
  @Input() fetchingData: boolean = false;
  @Input() title: string = "";
  @Input() showBackButton: boolean = true;
  @Input() backUrl: string = "";
  @Input() urlQuery: any = {};
  @Output() openSideBarChange: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public generalService: GeneralService,
    private authService: AuthService,
    // private notification: NzNotificationService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
			Headway.init({
				selector: ".headway-container",
				account: "7gbVvx"
			  });
		}, 1000);
  }

  toggleSidebar() {
    this.openSideBar = !this.openSideBar;
    this.openSideBarChange.emit(this.openSideBar);
  }

  resendVerificationEmail() {
    this.authService.resendEmail().subscribe(
      (res: any) => {
        if (res.statusCode === 200) {
          // this.notification.success(
          //   'Email verification link resent successfully.',
          //   '' + res.message,
          //   { nzClass: 'notification1' }
          // );
        }
        else {
          // this.notification.error(
          //   'Email verification could not be resent.',
          //   '' + res.message,
          //   { nzClass: 'notification1' }
          // );
        }
      }
    )
  }

  logout() {
    this.generalService.logoutUser();
  }

}


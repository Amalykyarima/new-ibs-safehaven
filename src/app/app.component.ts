import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'new-ibs-safehaven';
}

// app/app.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { GeneralReducer } from '../../src/app/resources/store/general/general.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ general: GeneralReducer })
  ]
})
export class AppStoreModule {}

import {
    patchState,
    signalStore,
    withState,
    withMethods,
  } from '@ngrx/signals';
  import { AppDisplay } from '../models/display';
  
  const initialState: AppDisplay = {
    modalView: false,
    sideDrawerView: false,
    modalType: '',
    modal: 'modal',
  };
  
  export const DisplayStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
      updateModalView(type: string, modal: string = 'modal') {
        patchState(store, (state) => ({
          modalView: type !== '' ? !state.modalView : false,
          modalType: type,
          modal,
          sideDrawerView: false,
        }));
      },
      closeModal() {
        patchState(store, {
          modalView: false,
          modalType: '',
          modal: 'modal',
        });
      },
      updateDrawerView() {
        patchState(store, (state) => ({
          sideDrawerView: !state.sideDrawerView,
        }));
      },
    }))
  );
  
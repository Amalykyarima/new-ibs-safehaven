import {
  patchState,
  signalStore,
  withState,
  withMethods,
  withComputed,
} from '@ngrx/signals';
import { computed } from '@angular/core';

type ModalState = {
  [key: string]: boolean;
};

export interface AppDisplay {
  modals: ModalState;
  sideDrawerView: boolean;
}

const initialState: AppDisplay = {
  modals: {},
  sideDrawerView: false,
};

export const DisplayStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    modalName: computed(() => {
      const modals = store.modals();
      const openModalKey = Object.keys(modals).find((key) => modals[key]);

      if (!openModalKey) return '';

      return openModalKey
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }),
  })),
  withMethods((store) => ({
    openModal(modalKey: string) {
      patchState(store, (state) => ({
        modals: {
          ...state.modals,
          [modalKey]: true,
        },
      }));
    },
    
    closeModal(modalKey: string) {
      patchState(store, (state) => ({
        modals: {
          ...state.modals,
          [modalKey]: false,
        },
      }));
    },
    closeAllModals() {
      patchState(store, {
        modals: {},
      });
    },
    updateDrawerView() {
      patchState(store, (state) => ({
        sideDrawerView: !state.sideDrawerView,
      }));
    },
  }))
  
);

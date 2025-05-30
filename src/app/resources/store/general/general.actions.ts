import { createAction, props } from '@ngrx/store';

export const saveCurrentUser = createAction(
  '[General] Save Current User',
  props<{ currentUser: object }>()
);

export const loadGenerals = createAction(
  '[General] Load Generals'
);





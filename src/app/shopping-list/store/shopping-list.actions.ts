import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const add_ingredients = createAction(
  'ADD_INGREDIENT',
  props<{ value: Ingredient }>()
);

export const add_more_ingredients = createAction(
  'ADD_MORE_INGREDIENT',
  props<{ value: Ingredient[] }>()
);
export const update_ingredients = createAction(
  'UPDATE_INGREDIENT',
  props<{ value: Ingredient }>()
);
export const delete_ingredients = createAction('DELETE_INGREDIENT');

export const start_editing = createAction(
  'START_EDITING',
  props<{ value: number }>()
);

export const stop_editing = createAction('STOP_EDITING');

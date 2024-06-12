import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const set_recipe = createAction(
  'SET_RECIPE',
  props<{ value: Recipe[] }>()
);

export const fetch_recipe = createAction('FETCH_RECIPE');

export const add_recipe = createAction(
  'ADD_RECIPE',
  props<{ value: Recipe }>()
);

export const update_recipe = createAction(
  'UPDATE_RECIPE',
  props<{ value: { index: number; newRecipe: Recipe } }>()
);

export const delete_recipe = createAction(
  'DELETE_recipe',
  props<{ value: number }>()
);

export const store_recipe = createAction('STORE_RECIPE');

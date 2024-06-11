import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  add_ingredients,
  add_more_ingredients,
  delete_ingredients,
  start_editing,
  update_ingredients,
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
export interface AppState {
  shoppingList: State;
}
const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 5)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};
export const ShoppingListReducer = createReducer(
  initialState,
  on(add_ingredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.value],
    };
  }),
  on(add_more_ingredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.value],
    };
  }),
  on(update_ingredients, (state, action) => {
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updateIng = {
      ...ingredient,
      ...action.value,
    };
    const updateIngs = [...state.ingredients];
    updateIngs[state.editedIngredientIndex] = updateIng;
    return {
      ...state,
      ingredients: updateIngs,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(delete_ingredients, (state) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((ig, igIndex) => {
        return igIndex !== state.editedIngredientIndex;
      }),
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(start_editing, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.value,
      editedIngredient: state.ingredients[action.value],
    };
  }),
  on(delete_ingredients, (state) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);

import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import {
  add_recipe,
  delete_recipe,
  set_recipe,
  update_recipe,
} from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const RecipeReducer = createReducer(
  initialState,
  on(set_recipe, (state, action) => {
    return {
      ...state,
      recipes: [...action.value],
    };
  }),
  on(add_recipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.value],
    };
  }),
  on(update_recipe, (state, action) => {
    const updatedRecipe = {
      ...state.recipes[action.value.index],
      ...action.value.newRecipe,
    };
    const updatedRecipes = [...state.recipes];
    updatedRecipes[action.value.index] = updatedRecipe;
    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(delete_recipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter((recipe, index) => {
        return index !== action.value;
      }),
    };
  })
);

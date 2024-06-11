import { AppState } from './shopping-list.reducer';

export const selectIngredient = (state: AppState) => state.shoppingList;

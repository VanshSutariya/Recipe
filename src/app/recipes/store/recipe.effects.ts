import { Injectable } from '@angular/core';
import * as RecipesActions from './recipe.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Recipe } from '../recipe.model';
import { recipeSelector } from './recipe.selector';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetch_recipe),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://redux-50af9-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes: Recipe[]) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes: Recipe[]) => {
        console.log(recipes, 'loooooooooooopppppppppppppppp');

        return RecipesActions.set_recipe({ value: recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.store_recipe),
        withLatestFrom(this.store.select(recipeSelector)),
        tap((data) => {
          console.log(data, 'kkkkkkkkkkkkkkkkk');
        }),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://redux-50af9-default-rtdb.firebaseio.com/recipes.json',
            recipesState
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) {}
}

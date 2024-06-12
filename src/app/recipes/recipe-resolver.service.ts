import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { recipeSelector } from './store/recipe.selector';
import { map, of, switchMap, take } from 'rxjs';
import { fetch_recipe } from './store/recipe.action';
import * as RecipesActions from './store/recipe.action';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store, private action$: Actions) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(recipeSelector).pipe(
      take(1),
      map((recipeState) => {
        console.log(recipeState);

        return recipeState;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(fetch_recipe());
          return this.action$.pipe(
            ofType(RecipesActions.set_recipe),
            take(1),
            map((action: any) => {
              console.log(action);

              return action.payload;
            })
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}

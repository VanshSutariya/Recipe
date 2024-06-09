import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from '../recipes/recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipe();
    } else {
      return recipes;
    }
  }
}

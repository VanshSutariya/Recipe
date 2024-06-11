import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIngredient } from './store/shopping-list.selectors';
import { start_editing } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.ingredients$ = this.store.select(selectIngredient);
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    this.store.dispatch(start_editing({ value: index }));
    // this.slService.startEditing.next(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

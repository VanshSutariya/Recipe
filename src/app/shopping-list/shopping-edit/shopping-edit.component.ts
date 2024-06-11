import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  add_ingredients,
  delete_ingredients,
  stop_editing,
  update_ingredients,
} from '../store/shopping-list.actions';
import { selectIngredient } from '../store/shopping-list.selectors';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: true }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectIngredient).subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        update_ingredients({
          value: newIngredient,
        })
      );
    } else {
      this.store.dispatch(add_ingredients({ value: newIngredient }));
      // this.slService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(stop_editing());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(delete_ingredients());
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(stop_editing());
  }
}

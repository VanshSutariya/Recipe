import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { authSelector } from '../auth/store/auth.selector';
import { logout } from '../auth/store/auth.action';
import { fetch_recipe, store_recipe } from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  userSub: Subscription;
  isAuthenticated = false;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select(authSelector)
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.store.dispatch(store_recipe());
  }

  onFetchData() {
    this.store.dispatch(fetch_recipe());
  }
  logout() {
    this.store.dispatch(logout());
    // this.authService.logout();
  }
}

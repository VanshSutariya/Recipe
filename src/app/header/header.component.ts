import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { authSelector } from '../auth/store/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  userSub: Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select(authSelector)
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe();
  }
  logout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { auto_login } from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(auto_login());
  }
}

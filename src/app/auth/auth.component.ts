import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { authSelector } from './store/auth.selector';
import { clearError, login_start, signup_start } from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  loginMode: boolean = true;
  isLoading = false;
  error: string = null;
  storeSub: Subscription;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.initForm();
    this.storeSub = this.store.select(authSelector).subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.loginMode) {
      this.store.dispatch(
        login_start({ value: { email: email, password: password } })
      );
      // authObs = this.authService.login(email, password);
    } else {
      this.store.dispatch(signup_start({ email: email, password: password }));
      // authObs = this.authService.signUp(email, password);
    }

    // authObs.subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   },
    // });

    this.authForm.reset();
  }

  handleError() {
    this.store.dispatch(clearError());
    // this.error = null;
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
}

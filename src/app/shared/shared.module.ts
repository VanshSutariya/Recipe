import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loadingSpinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadingSpinnerComponent, AlertComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule,
    DropdownDirective,
  ],
})
export class SharedModule {}

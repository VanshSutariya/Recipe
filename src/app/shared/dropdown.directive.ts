// import {
//   Directive,
//   ElementRef,
//   HostBinding,
//   HostListener,
// } from '@angular/core';

// @Directive({ selector: '[appDropdown]' })
// export class DropdownDirective {
//   @HostBinding('class.open') isOpen = false;
//   // @HostListener('click') toggleOpen() {
//   //   this.isOpen = !this.isOpen;
//   // }

//   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//     this.isOpen = this.elRef.nativeElement.contains(event.target)
//       ? !this.isOpen
//       : false;
//   }

//   constructor(private elRef: ElementRef) {}
// }

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class DropdownDirective {
  @HostBinding('class.open') onClick = false;
  @HostListener('click') toggleDown() {
    this.onClick = !this.onClick;
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './error.component.html'
})
// tslint:disable-next-line: component-class-suffix
export class ErrorCompoent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
  message = 'An unknown error occured!';
}

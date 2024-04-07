import { Component } from '@angular/core';

@Component({
  selector: 'todo-root',
  template:`
  <todo-top-bar></todo-top-bar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {}

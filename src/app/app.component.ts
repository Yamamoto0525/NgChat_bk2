import { Component } from '@angular/core';
import { Comment, User } from './class/chat';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

@Component({
  selector: 'app-root',
  template: `
  	<app-header></app-header>
  	<router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor() { 
  }

}

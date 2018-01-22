import { Component } from '@angular/core';
import { Comment, User } from './class/chat';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// Observableを削除

const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');
// COMMENTSを削除

@Component({
  selector: 'app-root',
  template: `
  	<app-header></app-header> <!--追加-->
  	<app-chat></app-chat>
  `,　// templateに変更
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { 
  }

}

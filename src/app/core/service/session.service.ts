import { Injectable } from '@angular/core';
import { Session, Password }  from '../../class/chat';
import { Router } from '@angular/router';
import { Subject}  from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth'; // 追加
import * as firebase from 'firebase/app'; // 追加

@Injectable()
export class SessionService {

  public session = new Session();
  public sessionSubject = new Subject<Session>();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private router: Router,
              private afAuth: AngularFireAuth) { } // 追加

  // アカウント作成
  signup(account: Password): void { // 追加
    this.afAuth
    .auth
    .createUserWithEmailAndPassword(account.email, account.password) // アカウント作成
    .then( user => user.sendEmailVerification()) // メールアドレス確認
    .then(() => alert('メールアドレス確認メールを送信しました。'))
    .catch( err => {
      console.log(err);
      alert('アカウントの作成に失敗しました。\n' + err)
    })
  }

  login(account: Password): void { // 変更
    this.afAuth
    .auth
    .signInWithEmailAndPassword(account.email, account.password)
    .then(() => {
      this.session.login = true;
      this.sessionSubject.next(this.session);
      return this.router.navigate(['/']);
    }).then(() => alert('ログインしました。'))
    .catch( err => {
      console.log(err);
      alert('ログインに失敗しました。\n' + err);
    })
  }

  logout(): void { // 変更
    this.afAuth
    .auth
    .signOut()
    .then(() => {
      this.sessionSubject.next(this.session.reset());
      return this.router.navigate(['/account/login']);
    }).then(() => alert('ログアウトしました。'))
    .catch( err => {
      console.log(err);
      alert('ログアウトに失敗しました。\n' + err);
    })
  }

}

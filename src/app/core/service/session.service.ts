import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Password, User } from '../../class/chat';
import * as fromCore from '../../core/store/reducers';
import { LoadSessions, LogoutSessions, UpdateSessions } from '../store/actions/session.actions';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private store: Store<fromCore.State>) {
  }

  // ログイン状況確認
  checkLogin(): void {
    // ストアにセッションデータを反映
    this.store.dispatch(new LoadSessions());
  }

  // ログイン状況確認(State)
  checkLoginState(): Observable<boolean> {
    return this.afAuth
      .authState
      .pipe(
        map((auth: any) => {
          // ログイン状態を返り値の有無で判断
          return (!!auth);
        })
      );
  }

  login(account: Password): void {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
        if (!auth.user.emailVerified) {
          this.afAuth.auth.signOut();
          return Promise.reject('メールアドレスが確認できていません。');
        } else {
          // ストアにセッションデータを反映
          this.store.dispatch(new UpdateSessions({auth: auth.user}));
        }
      })
      .catch(err => {
        console.log(err);
        alert('ログインに失敗しました。\n' + err);
      });
  }

  logout(): void {
    // ストアにセッションデータを反映
    this.store.dispatch(new LogoutSessions());
  }

  // アカウント作成
  signup(account: Password): void {
    let auth;
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(account.email, account.password) // アカウント作成
      .then(_auth => {
        auth = _auth;
        return auth.user.sendEmailVerification(); // メールアドレス確認
      })
      .then(() => {
        return this.createUser(new User(auth.user.uid, account.name));
      })
      .then(() => this.afAuth.auth.signOut())
      .then(() => {
        account.reset();
        alert('メールアドレス確認メールを送信しました。');
      })
      .catch(err => {
        console.log(err);
        alert('アカウントの作成に失敗しました。\n' + err);
      });
  }

  // ユーザーを作成
  private createUser(user: User): Promise<void> {
    return this.afs
      .collection('users')
      .doc(user.uid)
      .set(user.deserialize());
  }

}

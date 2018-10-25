import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import {
  LoadSessions,
  LoadSessionsFail,
  LoadSessionsSuccess,
  LogoutSessions, LogoutSessionsFail,
  LogoutSessionsSuccess,
  SessionActionTypes, UpdateSessions, UpdateSessionsFail, UpdateSessionsSuccess
} from '../actions/session.actions';
import { Session, User } from '../../../class/chat';


@Injectable()
export class SessionEffects {

  constructor(private actions$: Actions,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {}

  /**
   * Load Sessions
   */

  @Effect()
  loadSession$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadSessions>(SessionActionTypes.LoadSessions),
      map(action => action),
      // ユーザーの認証状況を取得
      switchMap(() => {
        return this.afAuth.authState
          .pipe(
            take(1),
            map(result => result),
            catchError(this.handleLoginError('fetchAuth', null))
          );
      }),
      // ユーザーの認証下情報を取得
      switchMap((auth: any) => {
        if (!auth) {
          return of(new LoadSessionsFail({ error: 'not logged in' }));
        }
        return this.afs
          .collection<User>('users')
          .doc(auth.uid)
          .valueChanges()
          .pipe(
            take(1),
            map((result: User) => {
              return new LoadSessionsSuccess({
                session: new Session(result)
              });
            }),
            catchError(this.handleLoginError(
              'fetchUser',
              new LoadSessionsFail({ error: 'not logged in' }))
            )
          );
      })
    );

  /**
   * Update Session
   */

  @Effect()
  updateSession$: Observable<Action> =
    this.actions$.pipe(
      ofType<UpdateSessions>(SessionActionTypes.UpdateSessions),
      map(action => action.payload.auth),
      switchMap((auth: any) => {
        if (!auth || !auth.uid) {
          return of(new UpdateSessionsFail({ error: 'not logged in' }));
        }
        return this.afs
          .collection<User>('users')
          .doc(auth.uid)
          .valueChanges()
          .pipe(
            take(1),
            map((result: User) => {
              alert('ログインしました。');
              this.router.navigate([ '/' ]);
              return new UpdateSessionsSuccess({
                session: new Session(result)
              });
            }),
            catchError(this.handleLoginError('updateUser',
              new LoadSessionsFail({ error: 'not logged in' }), true)
            )
          );
      })
    );

  /**
   * Logout Session
   */

  @Effect()
  logoutSession$: Observable<Action> =
    this.actions$.pipe(
      ofType<LogoutSessions>(SessionActionTypes.LogoutSessions),
      map(action => action),
      switchMap(() => this.afAuth.auth.signOut()),
      map(() => {
        alert('ログアウトしました。');
        this.router.navigate([ '/account/login' ]);
        return new LogoutSessionsSuccess({
          session: new Session()
        });
      }),
      catchError(error => {
        alert('ログアウトに失敗しました。\n' + error);
        return of(new LogoutSessionsFail({ error }));
      })
    );

  // エラー発生時の処理
  private handleLoginError<T> (operation = 'operation', result: T, dialog?: boolean) {
    return (error: any): Observable<T> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // アラートダイアログの表示
      if (dialog) {
        alert('ログインに失敗しました。\n' + error);
      }

      // ログアウト処理
      this.afAuth.auth.signOut()
        .then(() => this.router.navigate([ '/account/login' ]));

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}


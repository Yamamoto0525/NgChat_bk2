import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import { Comment } from '../../class/chat';
import {
  AddChat,
  ChatActionTypes,
  DeleteChat,
  LoadChats,
  LoadChatsFail,
  LoadChatsSuccess,
  UpdateChat,
  WriteChatChatFail,
  WriteChatSuccess,
} from './chat.actions';

@Injectable()
export class ChatEffects {

  constructor(private actions$: Actions,
              private db: AngularFirestore) {
  }

  @Effect()
  addChat$: Observable<Action> =
    this.actions$.pipe(
      ofType<AddChat>(ChatActionTypes.AddChat),
      map(action => action.payload.chat),
      switchMap((comment: Comment) => {
        return this.db
          .collection('comments')
          .add(comment.deserialize())
          .then(() => new WriteChatSuccess())
          .catch(() => new WriteChatChatFail({ error: 'failed to add' }));
      })
    );

  @Effect()
  updateChat$: Observable<Action> =
    this.actions$.pipe(
      ofType<UpdateChat>(ChatActionTypes.UpdateChat),
      map(action => action.payload.chat),
      switchMap((comment: Update<Comment>) => {
        return this.db
          .collection('comments')
          .doc(comment.id.toString())
          .update({ content: comment.changes.content, date: comment.changes.date })
          .then(() => {
            alert('コメントを更新しました');
            return new WriteChatSuccess();
          })
          .catch(() => new WriteChatChatFail({ error: 'failed to update' }));
      })
    );

  @Effect()
  deleteChat$: Observable<Action> =
    this.actions$.pipe(
      ofType<DeleteChat>(ChatActionTypes.DeleteChat),
      map(action => action.payload.id),
      switchMap((id: string) => {
        return this.db
          .collection('comments')
          .doc(id)
          .delete()
          .then(() => {
            alert('コメントを削除しました');
            return new WriteChatSuccess();
          })
          .catch(() => new WriteChatChatFail({ error: 'failed to delete' }));
      })
    );

  @Effect()
  loadChats$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadChats>(ChatActionTypes.LoadChats),
      map(action => action.payload.chats),
      switchMap(() => {
        return this.db.collection<Comment>('comments', ref => {
          return ref.orderBy('date', 'asc');
        }).snapshotChanges()
          .pipe(
            map(actions => actions.map(action => {
              // 日付をセットしたコメントを返す
              const data = action.payload.doc.data() as Comment;
              const key = action.payload.doc.id;
              const comment_data = new Comment(data.user, data.content);
              comment_data.setData(data.date, key);
              return comment_data;
            })),
            map((result: Comment[]) => {
              return new LoadChatsSuccess({
                chats: result
              });
            }),
            catchError(this.handleChatsError(
              'fetchChats', new LoadChatsFail()
            ))
          );
      })
    );

  // エラー発生時の処理
  private handleChatsError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}

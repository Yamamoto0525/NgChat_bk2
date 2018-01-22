import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../class/chat';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public FB_comments: AngularFireList<{}>;
  public content = '';
  public comments: Comment[] = [];
  public current_user = CURRENT_USER;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() { 
    this.FB_comments = this.db.list('comments');
    this.FB_comments.snapshotChanges().subscribe((actions: any[]) => {
      this.comments = [];
      actions.forEach((action: any) => {
        const val = action.payload.val();
        const key = action.payload.key;
        this.comments.push(new Comment(val.user, val.content).setData(val.date, key));
      });
    });
  }

  // 新しいコメントを追加
  addComment(comment: string) {
     if (comment) {
       this.FB_comments.push(new Comment(this.current_user, comment));
       this.content = '';
     }
  }

  // 編集フィールドの切り替え
  toggleEditComment(num: number) {
    this.comments[num].edit_flag = (this.comments[num].edit_flag) ? false : true;
  }

    // コメントを更新する
  saveEditComment(num: number, key: string) {
    this.FB_comments.update(key, {
      content: this.comments[num].content, 
      date: this.comments[num].date
    }).then( () => {
      alert('コメントを更新しました');
      this.comments[num].edit_flag = false;
    });
  }

  // コメントをリセットする
  resetEditComment(num: number) {
    this.comments[num].content = '';
  }

    // コメントを削除する
  deleteComment(key: string) {
    this.FB_comments.remove(key).then(() => {
      alert('コメントを削除しました');
    });
  }

}

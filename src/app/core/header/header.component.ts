import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SessionService } from '../service/session.service';
import { Session } from '../../class/chat';
import * as fromCore from '../store/reducers';

import { Observable } from 'rxjs'; // 追加

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loading$: Observable<boolean>; // 追加
  public session$: Observable<Session>; // 追加
  // public login = false; // 削除

  constructor(private sessionService: SessionService,
              private store: Store<fromCore.State>) { // 変更
    this.loading$ = this.store.select(fromCore.getLoading);
    this.session$ = this.store.select(fromCore.getSession);
  }

  ngOnInit() {
    // 削除
  }

  logout(): void {
    this.sessionService.logout();
  }

}

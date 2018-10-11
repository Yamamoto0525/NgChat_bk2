import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from '../service/session.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private session: SessionService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.session
      .checkLoginState()
      .pipe(
        map( session => {
          // ログインしていない場合はログイン画面に遷移
          if (session.login) {
            this.router.navigate(['/']);
          }
          return !session.login;
        })
      )
  }

}

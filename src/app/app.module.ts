import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
// import { ChatComponent } from './chat/chat.component'; // 削除
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';


const appRoutes: Routes = [
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: './chat/chat.module#ChatModule', // 変更
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    // ChatComponent, // 削除
    PageNotFoundComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

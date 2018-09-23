import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// FormsModuleを削除
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreModule } from './core/core.module'; // 追加
import { SharedModule } from './shared/shared.module'; // 追加
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component'; // 追加
// ChatDatePipeを削除


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    NgbModule.forRoot(),
    // FormsModuleを削除
    BrowserModule,
    CoreModule, // 追加
    SharedModule, // 追加
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

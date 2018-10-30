import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common'; // 削除
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ChatRoutingModule } from './chat-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat.component';
import { ChatEffects } from './store/chat.effects';
import * as fromChat from './store/chat.reducer';

@NgModule({
  imports: [
    // CommonModule, // 削除
    SharedModule, // 追加
    ChatRoutingModule,
    StoreModule.forFeature('chat', fromChat.reducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
  declarations: [
    ChatComponent, // 追加
  ]
})
export class ChatModule { }

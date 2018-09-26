import { NgModule } from '@angular/core';
// CommonModuleを削除

import { SharedModule } from '../shared/shared.module'; // 追加
import { AccountRoutingModule } from './account-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    // CommonModuleを削除
    SharedModule, // 追加
    AccountRoutingModule,
  ],
  declarations: [
    SignUpComponent,
    LoginComponent,
  ]
})
export class AccountModule { }

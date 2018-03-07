import { NgModule } from '@angular/core';
// CommonModuleを削除
import { SharedModule } from '../shared/shared.module'; // 追加
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [
    // CommonModuleを削除
    SharedModule, // 追加
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
  	LoginComponent, 
  	SignUpComponent,
  ]
})
export class AccountModule { }

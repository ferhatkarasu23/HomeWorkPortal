import { LoginComponent } from './components/login/login.component';
import { UyeComponent } from './components/uye/uye.component';
import { OdevComponent } from './components/odev/odev.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'odevler',
    component: OdevComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'uyeler',
    component: UyeComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Authguard checks if User is logged in
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: '**', component: PageNotFoundComponent }, // last Route should always stay at bottom of Routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const RoutingComponents = [
  DashboardComponent,
  BoardComponent,
  LoginComponent,
  RegisterComponent,
  PageNotFoundComponent,
];

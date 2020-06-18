import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';



const routes: Routes = [  
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: 'main', component: MainComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UserListComponent, canActivate:[AuthGuard]},
  {path: 'forbidden*',   component: ForbiddenComponent},
  {path: '**',   component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent} from './components/landing-page/landing-page.component'
import { LoginComponent} from './components/login/login.component'
import { SignupComponent} from './components/signup/signup.component'
import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BrokersComponent } from './components/brokers/brokers.component'
import { AcademiasComponent } from './components/academias/academias.component'
import { QuestionsComponent } from './components/questions/questions.component'
import { ProfileComponent } from './components/profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'brokers', component: BrokersComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'academias', component: AcademiasComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'faq', component: QuestionsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'perfil', component: ProfileComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

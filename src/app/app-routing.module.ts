import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent} from './components/landing-page/landing-page.component'
import { LoginComponent} from './components/login/login.component'
import { SignupComponent} from './components/signup/signup.component'
import { AngularFireAuthGuard, customClaims, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BrokersComponent } from './components/brokers/brokers.component'
import { AcademiasComponent } from './components/academias/academias.component'
import { QuestionsComponent } from './components/questions/questions.component'
import { ProfileComponent } from './components/profile/profile.component';
import { AdminCuentasComponent } from './components/admin-cuentas/admin-cuentas.component';
import { AdminBrokersComponent } from './components/admin-brokers/admin-brokers.component';
import { AdminQuestionsComponent } from './components/admin-questions/admin-questions.component';
import { AdminAcademiasComponent } from './components/admin-academias/admin-academias.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { TermsComponent } from './components/terms/terms.component';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AprendeComponent } from './components/aprende/aprende.component';
import { InvierteComponent } from './components/invierte/invierte.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const adminOnly = () => pipe(customClaims, map(claims => claims.role === 'admin'))

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'terminos', component: TermsComponent},
  {path: 'aviso', component: ConditionsComponent},
  {path: 'aprende', component: AprendeComponent},
  {path: 'invierte', component: InvierteComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'brokers', component: BrokersComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'academias', component: AcademiasComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'faq', component: QuestionsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'perfil', component: ProfileComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  {path: 'admin/reembolsos', component: AdminDashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: adminOnly}},
  {path: 'admin/cuentas', component: AdminCuentasComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: adminOnly}},
  {path: 'admin/brokers', component: AdminBrokersComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: adminOnly}},
  {path: 'admin/academias', component: AdminAcademiasComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: adminOnly}},
  {path: 'admin/faq', component: AdminQuestionsComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: adminOnly}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

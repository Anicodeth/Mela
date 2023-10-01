import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AllCampaignsPageComponent } from './all-campaigns-page/all-campaigns-page.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {CreateCampaignComponent} from "./create-campaign/create-campaign.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {DonateToCampaignComponent} from "./donate-to-campaign/donate-to-campaign.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {AuthGuard} from "./auth/auth.guard";
import {WithdrawlComponent} from "./withdrawl/withdrawl.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'profile/:user-id', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'campaign/:campaign-id', component: CampaignPageComponent, canActivate: [AuthGuard]},
  {path: "all-campaigns", component: AllCampaignsPageComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "create-campaign", component: CreateCampaignComponent, canActivate: [AuthGuard]},
  {path: "edit-profile", component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: "donate/:id", component: DonateToCampaignComponent, canActivate: [AuthGuard]},
  {path: "withdrawal", component: WithdrawlComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

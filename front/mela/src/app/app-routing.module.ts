import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'profile/:username', component: ProfilePageComponent },
  { path: 'campaign/:campaign-id', component: CampaignPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

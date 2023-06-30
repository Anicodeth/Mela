import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import { AllCampaignsPageComponent } from './all-campaigns-page/all-campaigns-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    CampaignPageComponent,
    AllCampaignsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

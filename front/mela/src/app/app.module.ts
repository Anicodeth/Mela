import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import { AllCampaignsPageComponent } from './all-campaigns-page/all-campaigns-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {NgOptimizedImage} from "@angular/common";
import { NavbarComponent } from './navbar/navbar.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DonateToCampaignComponent } from './donate-to-campaign/donate-to-campaign.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxEditorModule} from "ngx-editor";
import { WithdrawlComponent } from './withdrawl/withdrawl.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    CampaignPageComponent,
    AllCampaignsPageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    CreateCampaignComponent,
    EditProfileComponent,
    DonateToCampaignComponent,
    LandingPageComponent,
    WithdrawlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxEditorModule,
    ToastrModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

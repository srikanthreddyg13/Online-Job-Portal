import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './service/user/auth-guard.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './user/register/register.component';
import { ApplicantsModule } from './applicants/applicants.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateJobsComponent } from './admin/create-jobs/create-jobs.component';
import { ListJobsComponent } from './applicants/list-jobs/list-jobs.component';
import { AppDataService } from './service/store/app-data.service';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './applicants/dashboard/dashboard.component';
import { DetailsComponent } from './applicants/details/details.component';

/**
 * Added AuthGuard for components that can be accessible only after login 
 */
let routes: Routes = [
  {
  path:"",
  component:HomeComponent
},
{
  path:'contact',
  component:ContactComponent
 },
 {
  path:'home',
  component:HomeComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'createjobs',
  component:CreateJobsComponent,
  canActivate:[AuthGuardService]
},
{
  path:'applicants/list/details/:id',
  component: DetailsComponent,
  //canActivate:[AuthGuardService]
},
{
  path:'applicants',
  component: ListJobsComponent,
  canActivate:[AuthGuardService]
},
{
  path:'logout',
  component: HomeComponent,
  canActivate:[AuthGuardService]
},
{
  path:'user',
  component: LoginComponent
},
{
  path:'dashboard',
  component: DashboardComponent,
  canActivate:[AuthGuardService]
},
 {
   path:'**',
   component:PageNotFoundComponent
 }
];

@NgModule({
  declarations: [
  ListJobsComponent
  ],
  imports: [RouterModule.forRoot(routes),BrowserModule,FormsModule],
  providers:[AppDataService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
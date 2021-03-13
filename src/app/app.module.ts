import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { PhotograferPageComponent } from './components/pages/works/photografer-page/photografer-page.component';
import { PrInputComponent } from './components/--primitives/pr-input/pr-input.component';
import { MotorcycleSliderComponent } from './components/pages/works/motorcycle-slider/motorcycle-slider.component';
import { PrPromisesCheckerComponent } from './components/--primitives/pr-promises-checker/pr-promises-checker.component';

const routes: Routes = [
  { path: '', redirectTo: 'work-photografer', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'work-photografer', component: PhotograferPageComponent },
  { path: 'motorcycle-slider', component: MotorcycleSliderComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PhotograferPageComponent,
    PrInputComponent,
    MotorcycleSliderComponent,
    PrPromisesCheckerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

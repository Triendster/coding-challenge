import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ComparisonViewComponent } from './comparison-view/comparison-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DetailViewComponent,
    MainViewComponent,
    ComparisonViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

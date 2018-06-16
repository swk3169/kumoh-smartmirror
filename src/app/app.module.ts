import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { MainPageModule } from './main-page/main-page.module';
import { GlobalService } from './store/global.service';
import { HttpClientModule } from '@angular/common/http';

// import { NavBarComponent } from './nav-bar/nav-bar.component';
// import { LoginComponent } from './login/login.component';
// import { MainPageComponent } from './main-page/main-page.component';
// import { NewspeedComponent } from './newspeed/newspeed.component';
// import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    MainPageModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

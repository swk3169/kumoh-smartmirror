import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { MainPageModule } from './main-page/main-page.module';
import { NewspeedModule } from './newspeed/newspeed.module';
import { ProfileModule } from './profile/profile.module';
import { GlobalService } from './store/global.service';
import { HttpClientModule } from '@angular/common/http';
import { NewspeedAModule } from './newspeed-a/newspeed-a.module';
import { NewspeedBModule } from './newspeed-b/newspeed-b.module';
import { NewspeedCModule } from './newspeed-c/newspeed-c.module';
import { NewspeedNavModule } from './newspeed-nav/newspeed-nav.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    MainPageModule,
    NewspeedAModule,
    ProfileModule,
    NewspeedBModule,
    NewspeedCModule,
    NewspeedNavModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ProfilesService } from './profiles.service';

import { AppComponent } from './app.component';
import { NewProfileComponent } from './new-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProfilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import * as firebase from 'firebase';

import { IonicStorageModule } from '@ionic/storage';

var config = {
  apiKey: "AIzaSyB0ifK5u1SHPNA6woyMq3NhgpEf-Gcrxzw",
  authDomain: "encuesta-117d3.firebaseapp.com",
  databaseURL: "https://encuesta-117d3.firebaseio.com",
  projectId: "encuesta-117d3",
  storageBucket: "encuesta-117d3.appspot.com",
  messagingSenderId: "968972052942"
};

firebase.initializeApp(config);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

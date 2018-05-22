import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { MyApp } from './app.component';
import { GraphPage } from '../pages/graph/graph';
import { SummaryPage } from '../pages/summary/summary';
import { HttpModule } from '@angular/http';
import { ResultsPage } from '../pages/results/results';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    GraphPage,
    SummaryPage,
    ResultsPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GraphPage,
    SummaryPage,
    ResultsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AlertController
  ]
})
export class AppModule {}

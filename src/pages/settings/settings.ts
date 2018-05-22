import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  private serverIp: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.serverIp = sessionStorage.getItem("serverIp");
  }

  saveSettings(){
    sessionStorage.setItem("serverIp", this.serverIp);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}

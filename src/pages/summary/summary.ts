import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Data } from '../../models/data';
import { Tendency } from '../../models/tendency';
/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  private lastValue: Data;
  private serverIp: string = "192.168.137.222";
  private arrowDirection: Tendency;


  constructor(private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
  
  this.dataProvider.getDataWithLimit(this.serverIp, 1).subscribe(result=>{
    this.lastValue = result.json()[0];
    console.log(this.lastValue);
  });

  this.dataProvider.getTendency(this.serverIp).subscribe(result =>{
    this.arrowDirection = result.json();
    console.log(this.arrowDirection);
  });
  
  }

  enableUpArrow(){
    this.arrowDirection != null && this.arrowDirection.temperature_tendency == 0;
  }

  enableDownArrow(){
    this.arrowDirection != null && this.arrowDirection.temperature_tendency == -1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
  }

}

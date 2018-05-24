import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Data } from '../../models/data';
import { Tendency } from '../../models/tendency';
import { AlertController } from 'ionic-angular';
import { Renderer } from '@angular/core';
import * as $ from 'jquery'

/**
 * 
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
  private serverIp: string= "tzeny.ddns.net";
  private arrowDirection: Tendency;

  private repeatInterval: any;
  private weatherStatus: number;

  private heatIndexRecommendations = {
    low: "Caution: fatigue is possible with prolonged exposure and activity. Continuing activity could result in heat cramps.",
    medium: "Extreme caution: heat cramps and heat exhaustion are possible. Continuing activity could result in heat stroke.",
    high: "Danger: heat cramps and heat exhaustion are likely; heat stroke is probable with continued activity.",
    critical: "Extreme danger: heat stroke is imminent.",
    normal: "Normal: the heat index is within normal boundaries.",
    other: "Exposure to full sunshine can increase heat index values!"
  };


  constructor(private alertController: AlertController, private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer) {
    if(sessionStorage.getItem("serverIp") != null){
      this.serverIp = sessionStorage.getItem("serverIp");
    }
    this.loadData();
    this.repeatInterval = setInterval(() => {
      this.loadData();
    }, 5000);

  }

  loadValues() {
    return this.dataProvider.getDataWithLimit(this.serverIp, 1).toPromise().then(result => {
      this.lastValue = result.json()[0];

      this.lastValue.humidity = Math.round(this.lastValue.humidity * 100) / 100;
      this.lastValue.pressure = Math.round(this.lastValue.pressure * 100) / 100;
      this.lastValue.heat_index = Math.round(this.lastValue.heat_index * 100) / 100;
      this.lastValue.dew_point = Math.round(this.lastValue.dew_point * 100) / 100;
      console.log(this.lastValue);
    });

  }

  ngOnDestroy() {
    clearInterval(this.repeatInterval);
  }

  loadTendencies() {
    return this.dataProvider.getTendency(this.serverIp).toPromise().then(result => {
      this.arrowDirection = result.json();
      console.log(this.arrowDirection);
    });
  }

  loadData() {
    return this.loadValues().then(() => {
      this.weatherStatus = 1;
      this.loadTendencies();
    })
  }

  getHeatIndexRec() {
    var recMsg: string;

    if (this.lastValue.heat_index < 27) {
      recMsg = this.heatIndexRecommendations.normal;
    }

    if (this.lastValue.heat_index > 27 && this.lastValue.heat_index < 32) {
      recMsg = this.heatIndexRecommendations.low;
    }

    if (this.lastValue.heat_index > 32 && this.lastValue.heat_index < 41) {
      recMsg = this.heatIndexRecommendations.medium;
    }

    if (this.lastValue.heat_index > 41 && this.lastValue.heat_index < 54) {
      recMsg = this.heatIndexRecommendations.high;
    }

    if (this.lastValue.heat_index > 54) {
      recMsg = this.heatIndexRecommendations.critical;
    }

    return recMsg;
  }

  showArrow(property: string, value: number) {
    return this.arrowDirection != null && this.arrowDirection[property] != value;
  }

  getArrowIcon(property: string) {
    if (this.arrowDirection != null) {
      if (this.arrowDirection[property] > 0) {
        return "arrow-up";
      } else {
        return "arrow-down";
      }
    }
  }

  showHeatIndexAlert() {
    var alert = this.alertController.create();
    alert.setCssClass("backRed");
    alert.setTitle("Heat index");
    alert.setSubTitle("The heat index (HI) or humiture is a scientific index that combines air temperature and relative humidity, in shaded areas, to determine a human-perceived equivalent temperature, as how hot it would feel if the humidity were some other value in the shade. The result is also known as the \"felt air temperature\" or \"apparent temperature\".");
    alert.present();
  }

}

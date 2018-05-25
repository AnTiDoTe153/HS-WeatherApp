import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Data } from '../../models/data';

/**
 * Generated class for the AgriculturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agriculture',
  templateUrl: 'agriculture.html',
})
export class AgriculturePage {

  private gdd: number = 52.3;
  private maxTemp: number;
  private minTemp: number;
  private baseTemp: number = 10;

  private gddData: Array<any> = [
    { name: "Witch-hazel", number: "begins flowering at <1 GDD"  },
    { name: "Wheat", number: "143-178 GDD to emergence and 1550-1680 GDD to maturity" },
    { name: "Sumac", number: "begins flowering at 450-500 GDD"  },
    { name: "Sugar maple", number: "begin flowering at 1-27 GDD"  },
    { name: "Red maple", number: "begins flowering at 1-27 GDD"  },
    { name: "Purple loosestrife", number: "begins flowering at 400-450 GDD"  },
    { name: "Privet", number: "begins flowering at 330-400 GDD"  },
    { name: "Oats", number: "1500-1750 GDD to maturity"  },
    { name: "Norway maple", number: "begins flowering at 30-50 GDD"  },
    { name: "Horsechestnut", number: "begin flowering at 80-110 GDD"  },
  ];

  private serverIp: string = "tzeny.ddns.net";
  private gddTableIsVisible: boolean = false;
  private dewInfoIsVisible: boolean = false;
  private dewPoint: number;

  constructor(public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    if(sessionStorage.getItem("serverIp") != null){
      this.serverIp = sessionStorage.getItem("serverIp");
    }
    this.setGddValue();
    this.setDewPoint();
  }

  setGddValue(){
    this.setMinMaxValues().then(() =>{
      console.log(this.minTemp);
      console.log(this.maxTemp);

      this.gdd = (this.maxTemp + this.minTemp) * 2 - this.baseTemp;
      if(this.gdd < 0){
        this.gdd = 0;
      }
    });
  }

  toggleDewInfo(){
    this.dewInfoIsVisible = !this.dewInfoIsVisible;
  }

  toggleGddTable(){
    this.gddTableIsVisible = !this.gddTableIsVisible;
  }

  setDewPoint(){
    this.dataProvider.getDataWithLimit(this.serverIp, 1).subscribe(result=>{
      this.dewPoint = result.json()[0].dew_point;
      this.dewPoint = Math.round(this.dewPoint * 100) / 100;
    });
  }

  setMinMaxValues(){
    return this.dataProvider.getDataWithLimit(this.serverIp, 500).toPromise().then((result)=>{
      console.log(result.json());
      var list: Array<Data> = result.json();
      var min = 100, max = -100;
      for(let item of list){
        if(item.temperature < min){
          min = item.temperature;
        }
        if(item.temperature > max){
          max = item.temperature;
        }
      }

      this.minTemp = min;
      this.maxTemp = max;
    });
  }

}

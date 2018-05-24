import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Data } from "../../models/data";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  constructor(public http: Http) {
  }

  getData(serverIp: string){

    return this.http.get("http://" + serverIp + ":5000/weather_history");
  }

  getTendency(serverIp: string){
    return this.http.get("http://" + serverIp + ":5000/tendency");
  }

  getDataWithLimit(serverIp: string, limit: number){

    return this.http.get("http://" + serverIp + ":5000/weather_history?limit=" + limit);
  }

  getCloud(serverIp: string, limit: number){
    return this.http.get("http://" + serverIp + ":5000/cloud?limit" + limit);
  }
}

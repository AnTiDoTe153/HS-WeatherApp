import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import { DataProvider } from "../../providers/data/data";
import { Data } from "../../models/data";
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html'
})
export class GraphPage {

  private data: Array<Data>;
  private tempChart: any;
  private humidityChart: any;
  private pressureChart:any;

  private serverIp: string;
  private repeatInterval: any;

  constructor(private alertController: AlertController, private dataProvider: DataProvider, public navCtrl: NavController) {
    this.serverIp = sessionStorage.getItem("serverIp");
      this.loadData();
      this.repeatInterval = setInterval(() =>{this.loadData()}, 5000);

  }

  loadData(){
    this.dataProvider.getDataWithLimit(this.serverIp, 300).subscribe(data =>{
      this.data = data.json().reverse();
      console.log(this.data);
      this.refreshChart();
    });
  }

  ngOnDestroy(){
    clearInterval(this.repeatInterval);
  }

  changeServerIp(){
    var alert = this.alertController.create();
    alert.setTitle("Set server ip");

    alert.addInput({name: "ip", type: "text", value: this.serverIp});

    alert.addButton({text: "Ok", handler: data=>{ this.serverIp = data.ip; }});
    alert.present();
  }


  refreshChart(){

    var tempData: any = this.data.map(elem => [elem.timestamp * 1000, elem.temperature]);
    this.tempChart.series[0].setData(tempData, true);

    var pressData: any = this.data.map(elem =>[elem.timestamp * 1000, elem.pressure]);
    this.pressureChart.series[0].setData(pressData, true);

    var humidityData: any = this.data.map(elem =>[elem.timestamp * 1000, elem.humidity]);
    this.humidityChart.series[0].setData(humidityData, true);

  }

  ionViewDidLoad() {

    this.tempChart = HighCharts.chart('container1', {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        title: {
          text: 'Temperature fluctuation'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Temperature (Celsius)'
          },
          min: 0,
          max: 50
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.y} grd'
        },
      
        plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                    [0, HighCharts.Color('#e01818').setOpacity(0.8).get('rgba')],
                    [0.3, HighCharts.Color('#fff600').setOpacity(0.8).get('rgba')],
                    [0.7, HighCharts.Color('#00ff19').setOpacity(0.8).get('rgba')],
                    [1, HighCharts.Color('#6CF').setOpacity(0.8).get('rgba')]
                ]
              },
              marker: {
                radius: 2
            },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },
      
        colors: ['#6CF'],
      
        series: [{
          name: "Temperature",
          type: "area",
          data: []
        }]
      });

      this.humidityChart = HighCharts.chart('container2', {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        title: {
          text: 'Humidity fluctuation'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { 
            month: '%e. %b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Humidity (Percentage)'
          },
          min: 0,
          max: 100
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.y}% '
        },
      
        plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, HighCharts.getOptions().colors[0]],
                      [1, HighCharts.Color(HighCharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                radius: 2
            },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },
      
        colors: ['#6CF'],
      
        series: [{
          name: "Humidity",
          type: "area",
          data: []
        }]
      });

      this.pressureChart = HighCharts.chart('container3', {
        chart: {
          type: 'spline',
          zoomType: 'x'
        },
        title: {
          text: 'Pressure fluctuation'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { 
            month: '%e. %b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Pressure (Pascal)'
          },
          min: 900,
          max: 1100
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.y} pa'
        },
      
        plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                    [0, HighCharts.getOptions().colors[0]],
                    [1, HighCharts.Color(HighCharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 2
            },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },
      
        colors: ['#6CF'],
      
        series: [{
          name: "Pressure",
          type: "area",
          data: []
        }]
      });

  }
}

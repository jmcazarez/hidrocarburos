import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss'],
  preserveWhitespaces: true
})
export class ExecutiveDashboardComponent implements OnInit {

  public lineChartOptions: any = {};
  public barChartOptions: any = {};
  public areaChartOptions: any = {};
  public mixedChartOptions: any = {};

  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#000",
    cardBg         : "#fff",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }

  constructor() {}

  ngOnInit(): void {
    this.lineChartOptions = getLineChartOptions(this.obj);
    this.barChartOptions = getBarChartOptions(this.obj);
    this.areaChartOptions = getAreaChartOptions(this.obj);
    this.mixedChartOptions = getMixedChartOptions(this.obj);
  }

  
}

/**
 * Line chart options
 */
 function getLineChartOptions(obj: any) {
  return {
    series: [
      {
        name: "Data a",
        data: [45, 52, 38, 45]
      },
      {
        name: "Data b",
        data: [12, 42, 68, 33]
      },
      {
        name:
          "Data c",
        data: [8, 32, 48, 53]
      }
    ],
    chart: {
      type: "line",
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary, obj.danger, obj.warning],
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: "datetime",
      categories: ["2015", "2016", "2017", "2018"],
      lines: {
        show: true
      },
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0
      }
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round"
    },
  }
};



/**
 * Bar chart options
 */
function getBarChartOptions(obj: any) {
  return {
    series: [{
      name: 'sales',
      data: [30,40,45,50,49,60,70,91,125]
    }],
    chart: {
      type: 'bar',
      height: '320',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary],    
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/1991','01/01/1992','01/01/1993','01/01/1994','01/01/1995','01/01/1996','01/01/1997', '01/01/1998','01/01/1999'],
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4
      }
    }
  }
};


/**
 * Generating demo data for area chart
 */    
 function generateDayWiseTimeSeries(s: number, count: number) {
  var values = [[
    4,3,10,9,29,19,25,9,12,7,19,5,13,9,17,2,7,5
  ], [
    2,3,8,7,22,16,23,7,11,5,12,5,10,4,15,2,6,2
  ]];
  var i = 0;
  var series: any[] = [];
  var x = new Date("11 Nov 2020").getTime();
  while (i < count) {
    series.push([x, values[s][i]]);
    x += 86400000;
    i++;
  }
  return series;
}


/**
 * Area chart options
 */    
function getAreaChartOptions(obj: any) {
  return {
    series: [
      {
        name: 'Total Views',
        data: generateDayWiseTimeSeries(0, 18)
      }, {
        name: 'Unique Views',
        data: generateDayWiseTimeSeries(1, 18)
      }
    ],
    chart: {
      type: "area",
      height: 300,
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
      stacked: true,
    },
    colors: [obj.danger, obj.info],
    stroke: {
      curve: "smooth",
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      title: {
        text: 'Views',
      },
      tickAmount: 4,
      min: 0,
      labels: {
        offsetX: 0,
      },
      tooltip: {
        enabled: true
      }
    },
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy"
      },
    },
    fill: {
      type: 'solid',
      opacity: [0.4,0.25],
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
  }
};



/**
 * Mixed chart options
 */
function getMixedChartOptions(obj: any) {
  return {
    series: [
      {
        name: 'Team A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }, {
        name: 'Team B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }
    ],
    chart: {
      height: 300,
      type: 'line',
      stacked: false,
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.danger, obj.info],
    grid: {
      borderColor: obj.gridBorder,
      padding: {
        bottom: -4
      },
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    stroke: {
      width: [0, 3],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    fill: {
      opacity: [.75,0.25],
    },
    labels: ['01/01/2003', '02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003','09/01/2003','10/01/2003','11/01/2003'],
    markers: {
      size: 0
    },
    xaxis: {
      type:'datetime',
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      title: {
        text: 'Points',
      },
      labels: {
        offsetX: 0
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: [{
        formatter: function (y: any) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0) + " points";
          }
          return y;
        }
      }, {
        formatter: function (y: any) {
          if(typeof y !== "undefined") {
            return  y.toFixed(2) + " $";
          }
          return y;
        }
      }]
    }
  }
};
export interface GoogleChartConfigure {
  id: string;
  options: Options;
}

export interface Options {
  width: number;
  height: number;
  redFrom: number;
  redTo: number;
  yellowFrom: number;
  yellowTo: number;
  minorTicks: number;
}

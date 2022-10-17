export interface Configuration {
    id: string;
    options: Options;
    data: any[];
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

export enum Type {
    gauge = 'gauge',
}

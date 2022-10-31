export interface Configuration {
    data: Data;
    durationInSeconds: number;
    panelClass: AlertType | string;
}

export interface Data {
    message: string;
}

export enum AlertType {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
}

export interface ConfigureMap {
    id: string;
    center: Coordinates;
    zoom: number;
    showCircle: boolean;
    height: string;
    dragging: boolean;
    selectOptionFilter?: boolean;
}

export interface Coordinates {
    lat: string;
    lon: string;
}

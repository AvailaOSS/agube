export interface ConfigureMap {
    id: string;
    center: Coordinates;
    zoom: number;
    showCircle: boolean;
    height: string;
    width?: string;
    dragging: boolean;
    scrollWheelZoom?: boolean | undefined;
    selectOptionFilter?: boolean;
    otherPoints?: Coordinates[];
}

export interface Coordinates {
    lat: string;
    lon: string;
    description?: string;
}

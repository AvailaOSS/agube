export interface ConfigureMap {
    id: string;
    center: Coordinates;
    zoom: number;
    showMarker: boolean;
    height: string;
    width?: string;
    dragging: boolean;
    scrollWheelZoom?: boolean | undefined;
    selectOptionFilter?: boolean;
    otherPoints?: Coordinates[];
}

export interface Coordinates {
    id?: number;
    lat: string;
    lon: string;
    description?: string;
    type: MapIconType;
}

export enum MapIconType {
    HOUSE = '/assets/icons/house.svg',
    RESERVOIR = '/assets/icons/reservoir.svg',
    WATER_SOURCE = '/assets/icons/watersource.svg',
    WORK = '/assets/icons/wheelbarrow.svg',
}

export interface MapEvent {
    sourceTarget: AnimateToZoom;
    latlng: LatLng;
}

interface LatLng {
    lat: string;
    lng: string;
}

interface AnimateToZoom {
    _animateToZoom: number;
}

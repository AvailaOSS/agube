export interface MapEvent {
  sourceTarget: AnimateToZoom;
  latlng: LatLng;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface AnimateToZoom {
  _animateToZoom: number;
}

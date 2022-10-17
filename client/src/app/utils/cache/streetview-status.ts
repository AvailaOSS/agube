import { environment } from 'src/environments/environment';

export function isStreetViewAvailable(): boolean {
    return environment.googleMapsApiKey.length > 0;
}

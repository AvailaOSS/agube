import { DwellingDetail, ReservoirDetail } from '@availa/agube-rest-api';
import { Coordinates } from 'src/app/components/map/map/configure-map';

export function build(object: DwellingDetail | ReservoirDetail): Coordinates {
    let coordinates: Coordinates = {
        lat: String(object.latitude),
        lon: String(object.longitude),
        description: object.road + ' nº ' + object.number,
    };
    return coordinates;
}

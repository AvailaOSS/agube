import { DwellingDetail, ReservoirDetail } from '@availa/agube-rest-api';
import { Coordinates, MapIconType } from 'src/app/components/map/map/configure-map';
import { isReservoirDetail } from '../models/model-detector';

export function build(object: DwellingDetail | ReservoirDetail): Coordinates {
    let coordinates: Coordinates = {
        lat: String(object.latitude),
        lon: String(object.longitude),
        description: object.road + ' nº ' + object.number,
        type: getMapIconType(object),
    };
    return coordinates;
}

function getMapIconType(object: DwellingDetail | ReservoirDetail): MapIconType {
    if (isReservoirDetail(object)) {
        return MapIconType.RESERVOIR;
    } else {
        return MapIconType.HOUSE;
    }
}

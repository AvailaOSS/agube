import { DwellingDetail, ReservoirDetail, SpringSourceDetail } from '@availaoss/agube-rest-api';
import { Coordinates, MapIconType } from 'src/app/components/map/map/configure-map';
import { isDwellingDetail, isReservoirDetail, isSpringSourceDetail } from '../models/model-detector';

export function build(object: DwellingDetail | ReservoirDetail | SpringSourceDetail): Coordinates {
    let suffix = '';

    if (object.number) {
        suffix = ' nº ' + object.number;
    }

    if (isDwellingDetail(object)) {
        let dwelling = object as DwellingDetail;
        if (dwelling.resident_full_name) {
            suffix += '<br>' + dwelling.resident_full_name;
        }
        if (dwelling.resident_phone) {
            suffix += '<br>' + dwelling.resident_phone;
        }
    }

    let coordinates: Coordinates = {
        id: +object.id!,
        lat: String(object.latitude),
        lon: String(object.longitude),
        description: object.road + suffix,
        type: getMapIconType(object),
    };
    return coordinates;
}

function getMapIconType(object: DwellingDetail | ReservoirDetail | SpringSourceDetail): MapIconType {
    if (isReservoirDetail(object)) {
        return MapIconType.RESERVOIR;
    } else if (isDwellingDetail(object)) {
        return MapIconType.HOUSE;
    } else {
        return MapIconType.SPRING_SOURCE;
    }
}

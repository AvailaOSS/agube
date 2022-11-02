import { DwellingDetail, ReservoirDetail, SpringSourceDetail } from '@availaoss/agube-rest-api';

// The function isReservoirDetail is a user defined type guard
// the return type: 'object is ReservoirDetail' is a type predicate,
// it determines whether the object is a ReservoirDetail
export function isReservoirDetail(
    object: DwellingDetail | ReservoirDetail | SpringSourceDetail
): object is ReservoirDetail {
    return (object as ReservoirDetail).inlet_flow !== undefined;
    // TS now knows that objects within this if statement are always type ReservoirDetail
    // This is because the type guard isReservoirDetail narrowed down the type to ReservoirDetail
}

export function isDwellingDetail(
    object: DwellingDetail | ReservoirDetail | SpringSourceDetail
): object is DwellingDetail {
    const obj = object as DwellingDetail;
    return obj.resident_full_name !== undefined && obj.resident_phone !== undefined;
}
export function isSpringSourceDetail(
    object: DwellingDetail | ReservoirDetail | SpringSourceDetail
): object is SpringSourceDetail {
    const obj = object as SpringSourceDetail;
    return obj.number !== undefined;
    // TS now knows that objects within this if statement are always type SpringSourceDetail
    // This is because the type guard isSpringSourceDetail narrowed down the type to SpringSourceDetail
}

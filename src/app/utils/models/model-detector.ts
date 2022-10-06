import { DwellingDetail, ReservoirDetail } from '@availa/agube-rest-api';

// The function isReservoirDetail is a user defined type guard
// the return type: 'object is ReservoirDetail' is a type predicate,
// it determines whether the object is a ReservoirDetail
export function isReservoirDetail(object: DwellingDetail | ReservoirDetail): object is ReservoirDetail {
    return (object as ReservoirDetail).inlet_flow !== undefined;
    // TS now knows that objects within this if statement are always type ReservoirDetail
    // This is because the type guard isReservoirDetail narrowed down the type to ReservoirDetail
}

export function isDwellingDetail(object: DwellingDetail | ReservoirDetail): object is DwellingDetail {
    let obj = (object as DwellingDetail)
    return obj.resident_full_name !== undefined && obj.resident_phone !== undefined;
}
// export function isWaterSourceDetail(object: DwellingDetail | ReservoirDetail | WaterSourceDetail ): object is WaterSourceDetail {
//     return (object as WaterSourceDetail).inlet_flow !== undefined;
//     // TS now knows that objects within this if statement are always type ReservoirDetail
//     // This is because the type guard isReservoirDetail narrowed down the type to ReservoirDetail
// }
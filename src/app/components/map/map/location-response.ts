export interface LocationResponse {
    display_name: string;
    lat: string;
    lon: string;
    zoom: number;
    address: Address;
}

interface Address {
    city: string;
    county?: string; // city substitute
    country: string;
    city_district: string;
    municipality: string;
    postcode: string;
    province: string;
    state: string;
    road?: string;
    landuse?: string; // road substitute
    house_number?: number;
    village?: string;
}

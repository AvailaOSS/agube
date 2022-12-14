import { Router } from '@angular/router';
import { Coordinates, MapIconType } from 'src/app/components/map/map/configure-map';
import { Detail as DwellingDetailData } from 'src/app/page/dwelling/detail/detail';
import { Detail as ReservoirDetailData } from 'src/app/page/reservoir/detail/detail';
import { Detail as SpringSourceDetailData } from 'src/app/page/spring-source/detail/detail';
export function goToDwelling(router: Router, queryParams: DwellingDetailData) {
    router.navigate(['/manager/home/manager/client/dwellings/detail'], {
        queryParams,
    });
}

export function goToReservoir(router: Router, queryParams: ReservoirDetailData) {
    router.navigate(['/manager/home/reservoirs/detail'], {
        queryParams,
    });
}
export function goToSpringSource(router: Router, queryParams: SpringSourceDetailData) {
    router.navigate(['/manager/home/springsources/detail'], {
        queryParams,
    });
}
export function redirector(router: Router, point: Coordinates) {
    if (!point.id) {
        return;
    }

    switch (point.type) {
        case MapIconType.HOUSE:
            goToDwelling(router, {
                dwellingId: point.id,
            });
            break;
        case MapIconType.RESERVOIR:
            goToReservoir(router, {
                reservoirId: point.id,
            });
            break;
        case MapIconType.SPRING_SOURCE:
            goToSpringSource(router, {
                springSourceId: point.id,
            });
            break;
        default:
            break;
    }
}

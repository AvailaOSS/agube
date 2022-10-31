import { Component, Input, OnChanges } from '@angular/core';
import { ReservoirService, ReservoirCreate } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-reservoir-resume',
    styleUrls: ['./resume.component.scss'],
    templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnChanges {
    @Input() public reservoirId: number | undefined;
    public reservoir: ReservoirCreate | undefined = undefined;

    constructor(private svcReservoir: ReservoirService) {}

    ngOnChanges(): void {
        if (!this.reservoirId) {
            return;
        }

        this.svcReservoir.getReservoir(this.reservoirId).subscribe({
            next: (response) => {
                this.reservoir = response;
            },
            error: () => {
                this.reservoir = undefined;
            },
        });
    }
}

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

    public ngOnChanges(): void {
        if (!this.reservoirId) {
            return;
        }

        this.svcReservoir.getReservoir(this.reservoirId).subscribe({
            error: () => {
                this.reservoir = undefined;
            },
            next: (response) => {
                this.reservoir = response;
            },
        });
    }
}

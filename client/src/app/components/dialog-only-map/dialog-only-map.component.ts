import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogParameters } from '../dialog/dialog-parameter';
import { ConfigureMap } from '../map/map/configure-map';

@Component({
    selector: 'app-dialog-only-map',
    templateUrl: './dialog-only-map.component.html',
})
export class DialogOnlyMapComponent implements OnInit {
    @Output() submitClicked: EventEmitter<Geolocation | undefined> = new EventEmitter<Geolocation | undefined>();
    public configureMap: ConfigureMap | undefined;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogParameters,
        public dialogRef: MatDialogRef<DialogOnlyMapComponent>
    ) {}

    public ngOnInit(): void {
        this.configureMap = this.data.configureMap;
    }

    public closeDialog(): void {
        this.submitClicked.emit(undefined);
        this.dialogRef.close();
    }
}

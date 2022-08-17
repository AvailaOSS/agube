import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AddressService } from '@availa/agube-rest-api';
import { CreateComponent } from '../create/create.component';

@Component({
    selector: 'app-map-location-edit',
    templateUrl: '../create/create.component.html',
    styleUrls: ['../create/create.component.scss'],
})
export class EditComponent extends CreateComponent implements OnInit {
    override userHasFiltered = true;
    override automaticMode = true;

    constructor(
        protected override http: HttpClient,
        protected override formBuilder: FormBuilder,
        protected override svcAddress: AddressService
    ) {
        super(http, formBuilder, svcAddress);
        this.form = undefined;
        this.addressAlreadyCreated = [];
        this.addressExamples = [];
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        if (this.form) {
            this.form.filter = new FormControl('');
        }
    }
}

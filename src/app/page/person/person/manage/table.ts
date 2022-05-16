import { MatTableDataSource } from '@angular/material/table';
import { Owner, OwnerDetail, Resident, ResidentDetail } from '@availa/agube-rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

export class PersonTable {
    public displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'geolocation'];

    public title: string = 'PAGE.RESIDENTS.MANAGER.TABLE.TITLE';

    public dataSource: MatTableDataSource<ResidentDetail | OwnerDetail> = new MatTableDataSource();

    public isSelected: Resident | undefined = undefined;

    public filter = new FormControl('');

    constructor(protected router: Router, protected route: ActivatedRoute) {}

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }

    public goTo(person: Resident | Owner) {
        throw new Error('override it in your child class');
    }

    public loadPersons() {
        throw new Error('override it in your child class');
    }
}

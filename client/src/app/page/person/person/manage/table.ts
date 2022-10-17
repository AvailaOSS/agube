import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner, Resident } from '@availa/agube-rest-api';
import { ITableOwner } from './owner/table/table-owner';
import { ITableResident } from './resident/table/table-resident';

export class PersonTable {
    public displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'address'];

    public title: string = '';

    public dataSource: MatTableDataSource<ITableResident | ITableOwner> = new MatTableDataSource();

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

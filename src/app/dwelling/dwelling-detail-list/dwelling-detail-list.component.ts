import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { DWelling } from '../dwelling.component';
import { Router } from '@angular/router';
import { AgubeApiModule } from '../../../../apiaux/agube-rest-api-lib/src/lib/agube.api.module';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-dwelling-detail-list',
  templateUrl: './dwelling-detail-list.component.html',
  styleUrls: ['./dwelling-detail-list.component.scss'],
})
export class DWellingDetailListComponent implements OnInit {
  @Output() selected = new EventEmitter<DwellingDetail>();
  public users: any;
  public selectedRowIndex = '';
  public address: string;
  public displayedColumns: string[] = [
    'address',
    'water_meter',
    'resident_name',
    'phone',
  ];
  public dataSource: DWelling[];

  constructor(
    private svcRouter: Router,
    private readonly svcCreateNewDWelling: DwellingService
  )
  {
    console.log(JSON.parse(localStorage.getItem('currentUser')))
    this.users = JSON.parse(localStorage.getItem('currentUser'));
   }

  public addNewWelling(): void {
    this.svcRouter.navigate(['viviendas/alta/vivienda']);
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.svcCreateNewDWelling.dwellingList().subscribe(value => {
      console.log(value)
    })
    this.dataSource = [
      {
        id: '1',
        address: 'Invernalia, 5º 1A',
        water_meter: '0000001',
        resident_name: 'John Snow',
        phone: '666666666',
      },
      {
        id: '2',
        address: 'Invernalia, 1º 1C',
        water_meter: '0000002',
        resident_name: 'Eddard Stark',
        phone: '666666666',
      },
      {
        id: '3',
        address: 'Roca Dragón, 1 bajo',
        water_meter: '0000003',
        resident_name: 'Daenerys Targaryen',
        phone: '666666666',
      },
      {
        id: '4',
        address: 'Pentos, 99',
        water_meter: '0000004',
        resident_name: 'Khal Drogo',
        phone: '666666666',
      },
      {
        id: '5',
        address: 'Desembarco del Rey, 1',
        water_meter: '0000005',
        resident_name: 'Robert Baratheon',
        phone: '666666666',
      },
    ];
=======
    this.svcCreateNewDWelling.getDwellings().subscribe((value) => {
      this.dataSource = value;
    });
>>>>>>> dedf782... fix: update new apis
  }

  public selectRow(row: DwellingDetail): void {
    this.address = `${row.flat}  -  ${row.gate} - ${row.number} - ${row.street}  -  ${row.number} - ${row.street} - ${row.town}`;
    this.selected.emit(row);
    this.selectedRowIndex = row.address;
  }
}

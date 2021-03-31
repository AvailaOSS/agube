import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservoirService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: '',
  templateUrl: './addReservoir.component.html',
  styleUrls: ['./addReservoir.component.scss'],
})
export class AddReservoirComponent implements OnInit {

  public error: boolean = true;
  public username: string;
  constructor(
    private router: Router,
    private readonly svcCreateNewReservoir: ReservoirService
  ) {}


  public ngOnInit(): void{ }
  public sendForm(event: any): void {
    console.log(event)
  //  this.svcCreateNewReservoir.createReservoir({})
  //     .subscribe(
  //       (value) => {
  //         this.router.navigate(['/viviendas']);
  //       },
  //       (error) => {
  //         this.error = false;

  //       }
  //     );
  }
}

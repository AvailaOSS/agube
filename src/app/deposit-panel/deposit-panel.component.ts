import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface DepositPanel {
  id: string;
  address: string;
  water_meter: string;
  resident_name: string;
  phone: string;
}
@Component({
  selector: 'app-deposit-panel',
  templateUrl: './deposit-panel.component.html',
  styleUrls: ['./deposit-panel.component.scss']
})
export class DepositPanelComponent implements OnInit {
  public depositPanel: DepositPanel;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public selectItem(depositPanel: DepositPanel): void {
    this.depositPanel = depositPanel;
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }

  public addNewDeposit(): void{
      this.router.navigate(['depositos/alta/deposito']);

  }
}

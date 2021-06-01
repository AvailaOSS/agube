import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactBookRoute } from '../../contact-book/contact-book-route';
import { AgubeRoute } from '../agube-route';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public dwelling: string = AgubeRoute.DWELLING;
  public dwellingConfig: string = AgubeRoute.CONFIG;
  public dwellingReservoir: string = AgubeRoute.RESERVOIR;
  public contactBook: string = ContactBookRoute.CONTACT_BOOK;
  public wip: string = AgubeRoute.WIP;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    //
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}

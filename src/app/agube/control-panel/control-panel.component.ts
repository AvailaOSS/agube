import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@availa/auth-fe';
import { isNull } from 'lodash';
import { ContactBookRoute } from '../../contact-book/contact-book-route';
import { AgubeRoute } from '../agube-route';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;
  public dwelling: string = AgubeRoute.DWELLING;
  public dwellingConfig: string = AgubeRoute.CONFIG;
  public dwellingReservoir: string = AgubeRoute.RESERVOIR;
  public contactBook: string = ContactBookRoute.CONTACT_BOOK;
  public wip: string = AgubeRoute.WIP;

  constructor(
    private router: Router,
    private readonly svcAccountService: AccountService
  ) {
    this.svcAccountService.getUser().subscribe((value) => {
      if (isNull(value)) {
        this.svcAccountService.logout();
      }
    });
  }

  public ngOnInit(): void {
    this.users = this.svcAccountService.getUser();
  }

  public goTo(route: string): void {
    this.router.navigate([route]);
  }
}

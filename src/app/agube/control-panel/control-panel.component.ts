import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from 'lodash';
import { AccountService } from 'src/app/auth/login/service/account.service';
import { ContactBookRoute } from '../../contact-book/contact-book-route';
import { TaskRoute } from '../../task/task-route';
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
  public taskReading: string = TaskRoute.READING;
  public taskSchedule: string = TaskRoute.SCHEDULE;
  public taskIncidence: string = TaskRoute.INCIDENCE;

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

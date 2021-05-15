import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from 'lodash';
import { AccountService } from 'src/app/auth/login/service/account.service';
import { AgubeEnumPaths } from '../agube-enum-paths';
import { contactBookEnumPaths } from '../../contact-book/contact-dialog/contact-book-enum-paths';
import { taskEnumPaths } from '../../task/task-enum-paths';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;
  public dwelling: string = AgubeEnumPaths.DWELLING;
  public dwellingConfig: string = AgubeEnumPaths.CONFIG;
  public dwellingReservoir: string = AgubeEnumPaths.RESERVOIR;
  public contactBook: string = contactBookEnumPaths.CONTACTBOOK;
  public taskReading: string = taskEnumPaths.READING;
  public taskSchedule: string = taskEnumPaths.SCHEDULE;
  public taskIncidence: string = taskEnumPaths.INCIDENCE;


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

  public goTo(route: any): void {
    this.router.navigate([route]);
  }
}

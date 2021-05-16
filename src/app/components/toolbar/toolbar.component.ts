import { Component, OnInit } from '@angular/core';
import { AccountService } from '@availa/auth-fe';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public user = undefined;

  constructor(private readonly authService: AccountService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((result) => (this.user = result));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
})
export class ToolbarUserComponent implements OnInit {
  @Input() user;

  public hiddenDetails = true;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    console.log(this.user);
  }

  public showDetails(): void {
    this.hiddenDetails = !this.hiddenDetails;
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
}

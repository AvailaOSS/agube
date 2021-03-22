import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlPanelButton } from './control-panel-button';

@Component({
  selector: 'app-control-panel-button',
  templateUrl: './control-panel-button.component.html',
  styleUrls: ['./control-panel-button.component.scss'],
})
export class ControlPanelButtonComponent implements OnInit {
  @Input() buttonConfig: ControlPanelButton;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  public goTo() {
    this.router.navigate([this.buttonConfig.redirect], {
      relativeTo: this.route,
    });
  }
}

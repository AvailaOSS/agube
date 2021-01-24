import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-control-panel-button',
  templateUrl: './control-panel-button.component.html',
  styleUrls: ['./control-panel-button.component.scss'],
})
export class ControlPanelButtonComponent implements OnInit {
  @Input() name: string; // FIXME: do this required
  @Input() redirect: string; // FIXME: do this required
  @Input() icon: string = ''; // FIXME: do this optional

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  goTo() {
    this.router.navigate([this.redirect], { relativeTo: this.route });
  }
}

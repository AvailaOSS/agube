import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-base',
  templateUrl: './toolbar-base.component.html',
  styleUrls: ['./toolbar-base.component.scss']
})
export class ToolbarBaseComponent implements OnInit {

  constructor(private readonly svcRouter: Router) { }

  public ngOnInit(): void {
  }

  public goToRegister(): void{
    this.svcRouter.navigate(['/subscription']);
  }

}

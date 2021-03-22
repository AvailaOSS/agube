import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Toolbar } from './toolbar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public title = '';
  public username = '';

  constructor(private location: Location, private readonly router: Router) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if(user){
      // TODO: if user logged show username
      this.username = user;
    }else{
      // FIXME: remove else case when localStorage works
      this.username = 'Jonh Snow';
    }
    this.checkUrl([
      { title: 'Panel de Control', url: 'control-panel' },
      { title: 'Agenda', url: 'contact-book' },
    ]);
  }

  /**
   * FIXME: Do this in service for no dependency
   * @param currentUrl
   */
  public checkUrl(currentUrl: Toolbar[]) {
    currentUrl.forEach((url) => {
      if (this.location.path() === '/' + url.url) {
        this.title = url.title;
      }
    });
  }

  public goToControlPanel() {
    this.router.navigate(['/control-panel']);
  }
}

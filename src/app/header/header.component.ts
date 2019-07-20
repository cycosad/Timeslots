import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showMenu = true;

  @ViewChild('dhMenu', {static: false}) menuEle: ElementRef;

  constructor(
  ) {}

  ngOnInit() {
  }

  /**
   * Toggles the menu items depending on the screen size
   */

  onResize(event) {
    if (event.target.innerWidth > 768) {
      if (!this.showMenu) {
        this.showMenu = true;
      }
    } else {
      if (this.showMenu) {
        this.showMenu = false;
      }
    }
  }

  /**
   * On click toggles the menu
   */

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}

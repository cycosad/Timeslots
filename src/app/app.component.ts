import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment';

  navigateToPortfolio() {
    window.open('http://akhil-regonda.azurewebsites.net', '_blank');
  }

}

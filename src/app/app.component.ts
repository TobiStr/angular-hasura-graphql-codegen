import { Component } from '@angular/core';
import { GraphQlService } from './@graphql/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private graphQlService: GraphQlService) {}

  
}

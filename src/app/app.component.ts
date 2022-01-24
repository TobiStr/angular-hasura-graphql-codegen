import { Component } from '@angular/core';
import { Guid } from 'guid-typescript';
import { GraphQlService } from './@graphql/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public messages: string[];

  public message: string = 'Hello!';

  constructor(private graphQlService: GraphQlService) {
    this.graphQlService
      .SubscribeReceivedMessages(
        Guid.parse('e3bc9005-0e39-4b2f-a239-7a63804e7c91')
      )
      .subscribe(
        (result) =>
          (this.messages = result.user_by_pk.received_messages.map(
            (m) => m.text
          ))
      );
  }

  onClicked() {
    this.graphQlService.SendMessage(
      Guid.parse('83c3bc24-7da6-4ac1-b3f6-cd6455e33d7d'),
      Guid.parse('e3bc9005-0e39-4b2f-a239-7a63804e7c91'),
      this.message
    );

    this.message = '';
  }
}

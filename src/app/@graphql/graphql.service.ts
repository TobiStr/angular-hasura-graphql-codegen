import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Guid } from 'guid-typescript';
import { map, Observable, tap } from 'rxjs';
import {
  GetAllUsersMessagesQueryGQL,
  GetAllUsersMessagesQueryQuery,
  ReceivedMessagesByUserIdSubscriptionGQL,
  ReceivedMessagesByUserIdSubscriptionSubscription,
  SendMessageMutationGQL,
} from './_generated';

@Injectable({
  providedIn: 'root',
})
export class GraphQlService {
  constructor(
    private getAllUsersMessages: GetAllUsersMessagesQueryGQL,
    private sendMessageMutation: SendMessageMutationGQL,
    private receivedMessagesByUserIdSubscription: ReceivedMessagesByUserIdSubscriptionGQL
  ) {}

  public GetAllUsersMessages(): Observable<
    ApolloQueryResult<GetAllUsersMessagesQueryQuery>
  > {
    return this.getAllUsersMessages
      .watch()
      .valueChanges.pipe(tap((result) => console.log(result)));
  }

  public SendMessage(userId: Guid, message: string): void {
    this.sendMessageMutation
      .mutate({ sender_id: userId, text: message })
      .pipe(tap((result) => console.log(result)))
      .subscribe();
  }

  public SubscribeReceivedMessages(
    userId: Guid
  ): Observable<ReceivedMessagesByUserIdSubscriptionSubscription | undefined> {
    return this.receivedMessagesByUserIdSubscription
      .subscribe({ user_id: userId })
      .pipe(
        tap((result) => console.log(result)),
        map((result) => result.data)
      );
  }
}

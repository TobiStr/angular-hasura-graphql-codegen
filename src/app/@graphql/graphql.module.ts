import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Apollo } from 'apollo-angular';
import { WebSocketLink } from '@apollo/client/link/ws';
import { InMemoryCache } from '@apollo/client/core';

const GQL_WS_ENDPOINT = environment.graphqlWSEndpoint;

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [],
  declarations: [],
})
export class GraphQLModule {
  constructor(public apollo: Apollo) {
    this.initApolloWithHeaders({
      'x-hasura-admin-secret': '<your-admin-secret>',
    });

    // Use this for Token based authentication
    //this.initApolloWithHeaders({ authorization: 'Bearer ' + token })
  }

  private initApolloWithHeaders(headers: any) {
    const wsLink = new WebSocketLink({
      uri: GQL_WS_ENDPOINT,
      lazy: true, // For some reason, this is required when specifying multiple headers.
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: {
          headers: headers,
        },
      },
    });

    this.apollo.create(
      {
        link: wsLink,
        cache: new InMemoryCache(),
        name: 'GrahpQL Showcase Client',
        version: '0.0.0',
      },
      'default'
    );
  }
}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { environment } from "src/environments/environment";

const GQL_WS_ENDPOINT = environment.graphqlWSEndpoint;

@NgModule({
	imports: [CommonModule, HttpClientModule],
	providers: [],
	declarations: [],
})
export class GraphQLModule {

}

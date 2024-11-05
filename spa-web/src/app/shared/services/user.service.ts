import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private PATH = "/graphql";
  private HOST = "http://localhost:3001";
  private fullUrl = this.HOST + this.PATH;

  constructor(private apollo: Apollo) { }

  getUsers(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            getAllUsers {
              ID
              Name
              MiddleName
              LastName
              Adult
              Dni
            }
          }
        `,
        context: {
          uri: this.fullUrl,
        },
      })
      .valueChanges.pipe(
        map((result: any) => result.data)
      );
  }
  
}
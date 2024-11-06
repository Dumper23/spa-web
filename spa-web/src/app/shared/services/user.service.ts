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

  getAllUsers(): Observable<any> {
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

  addUser(user: { name: string; middleName?: string; lastName?: string; dni: string; adult?: boolean }): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation($name: String!, $middleName: String, $lastName: String, $dni: String!, $adult: Boolean) {
            createUser(name: $name, middleName: $middleName, lastName: $lastName, dni: $dni, adult: $adult) {
              Name
              MiddleName
              LastName
              Adult
              Dni
            }
          }
        `,
        variables: {
          name: user.name,
          middleName: user.middleName,
          lastName: user.lastName,
          dni: user.dni,
          adult: user.adult ?? false,  // Default to false if not provided
        },
        context: {
          uri: this.fullUrl,
        },
      })
      .pipe(
        map((result: any) => result.data)
      );
  }  
}
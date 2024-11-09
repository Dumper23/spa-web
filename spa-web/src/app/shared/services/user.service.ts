import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environemnt } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private PATH = "/graphql";
  private HOST = environemnt.SERVER_HOST;
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
        fetchPolicy: 'no-cache',
        context: {
          uri: this.fullUrl,
        },
      })
      .valueChanges.pipe(
        map((result: any) => result.data)
      );
  }

  addUser(user: { name: string; middleName?: string; lastName?: string; dni: string; adult?: boolean, password: string }): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation($name: String!, $middleName: String, $lastName: String, $dni: String!, $adult: Boolean, $password: String!) {
            createUser(name: $name, middleName: $middleName, lastName: $lastName, dni: $dni, adult: $adult, password: $password) {
              Name
              MiddleName
              LastName
              Adult
              Dni
            }
          }
        `,
        fetchPolicy: 'no-cache',
        variables: {
          name: user.name,
          middleName: user.middleName,
          lastName: user.lastName,
          dni: user.dni,
          adult: user.adult ?? false,
          password: user.password
        },
        context: {
          uri: this.fullUrl,
        },
      })
      .pipe(
        map((result: any) => result.data)
      );
  }  

  login(dni: string, password: string): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query login($dni: String!, $password: String!) {
            login(dni: $dni, password: $password)
          }
        `,
        variables: {
          dni,
          password
        },
        fetchPolicy: 'no-cache',
        context: {
          uri: this.fullUrl,
        },
      })
      .valueChanges.pipe(
        map((result: any) => result.data)
      );
  }
  
}
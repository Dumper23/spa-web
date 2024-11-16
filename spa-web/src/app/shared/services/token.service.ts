import { Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY } from '../constants/constants';
import { map, Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { environemnt } from '../../environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private PATH = "/graphql";
  private HOST = environemnt.SERVER_HOST;
  private fullUrl = this.HOST + this.PATH;

  constructor(private apollo: Apollo) { }

    getAccessToken(){
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    validateAccessToken(): Observable<boolean> {
      const token = this.getAccessToken();
      
      if (!token) return of(false);
    
      return this.apollo
        .watchQuery<any>({
          query: gql`
            query validateToken($token: String!) {
              validateToken(token: $token)
            }
          `,
          variables: {
            token: token,
          },
          fetchPolicy: 'no-cache',
          context: {
            uri: this.fullUrl,
          },
        })
        .valueChanges.pipe(
          map((result: any) => result.data.validateToken)
        );
    }
}
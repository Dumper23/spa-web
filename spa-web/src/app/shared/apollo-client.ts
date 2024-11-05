import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { environemnt } from '../environment/Environment';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: environemnt.DB_URI,
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://dex-server.herokuapp.com/', fetch }),
  cache: new InMemoryCache(),
});

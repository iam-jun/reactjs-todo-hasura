import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://inspired-stinkbug-15.hasura.app/v1/graphql',
  headers: {
    "x-hasura-admin-secret": `WQ5swuNVKiRPxvuwoqohSoEVasI0640KlZdilCSxUvP61KMw1CNcVFSQWVttr90P`,
  },
});

const wsLink = new WebSocketLink({
  uri: 'https://inspired-stinkbug-15.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": `WQ5swuNVKiRPxvuwoqohSoEVasI0640KlZdilCSxUvP61KMw1CNcVFSQWVttr90P`,
    },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

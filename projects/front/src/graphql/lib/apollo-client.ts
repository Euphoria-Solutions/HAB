import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { GRAPHQL_URI } from '@env'

const uri = GRAPHQL_URI
// const uri = 'http://192.168.2.2:3000/api/graphql'

const httpLink = createHttpLink({
  uri,
  fetch,
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
})

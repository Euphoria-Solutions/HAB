import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const uri =
  process.env.CURRENT_ENV === 'PROD'
    ? 'https://hab-back-zcznza3gq-euphoria-solutions-projects.vercel.app/api/graphql'
    : 'https://hab-back-zcznza3gq-euphoria-solutions-projects.vercel.app/api/graphql'

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

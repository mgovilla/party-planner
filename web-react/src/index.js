import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react'

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
})

const Main = () => (
  <ApolloProvider client={client}>
    <Auth0Provider
      domain="dev-m4964rtt.us.auth0.com"
      clientId="DamNz2S9KtJtIiYf9XNH5gXap2SpVewu"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()

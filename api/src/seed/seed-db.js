import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { getSeedMutations } from './seed-mutations'

dotenv.config()

const {
  GRAPHQL_SERVER_HOST: host,
  GRAPHQL_SERVER_PORT: port,
  GRAPHQL_SERVER_PATH: path,
} = process.env

const uri = `http://${host}:${port}${path}`

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache(),
})

const runMutations = async () => {
  const mutations = await getSeedMutations()
  // For every type, we run the mutations. This is order dependent as the parties must
  // exist before the users can be created (and connect to them)
  for (let set of mutations) {
    console.log(set)
    await Promise.all(
      set.map(({ mutation, variables }) => {
        return client
          .mutate({
            mutation,
            variables,
          })
          .catch((e) => {
            throw new Error(e)
          })
      })
    )
  }
}

runMutations()
  .then(() => {
    console.log('Database seeded!')
  })
  .catch((e) => console.error(e))

import React from 'react'
// import { useTheme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import HostCard from './HostCard'
import PartyCard from './PartyCard'
import PartyDialog from './CreatePartyDialog'
import { useAuth0 } from '@auth0/auth0-react'

export const GET_USER_PARTIES = gql`
  query getParties($id: ID!) {
    partyList: users(where: { id: $id }) {
      id
      name
      hosting {
        id
        name
        location
        date
        invitees {
          id
          name
        }
      }

      parties {
        id
        name
        location
        date
        host {
          id
          name
        }
      }
    }
  }
`

export default function PartiesList() {
  const { user } = useAuth0()
  //   const theme = useTheme()

  // data will be of the form: data = {users: [{hosting: [partyinfo], parties: [partyinfo]}]}
  const { loading, error, data } = useQuery(GET_USER_PARTIES, {
    variables: { id: user.sub },
  })

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Title>Your Parties</Title>
        <PartyDialog />
      </Grid>

      {data.partyList ? (
        data.partyList[0].hosting.map((p, i) => (
          <HostCard
            key={i}
            id={p.id}
            name={p.name}
            location={p.location}
            date={p.date}
            invitees={p.invitees}
          />
        ))
      ) : (
        <Typography variant="h5" component="h2">
          No Hosted Parties
        </Typography>
      )}

      {data.partyList ? (
        data.partyList[0].parties.map((p, i) => (
          <PartyCard
            key={i}
            id={p.id}
            name={p.name}
            location={p.location}
            date={p.date}
            host={p.host.name}
          />
        ))
      ) : (
        <div></div>
      )}
    </React.Fragment>
  )
}

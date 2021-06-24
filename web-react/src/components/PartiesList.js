import React from 'react'
// import { useTheme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import HostCard from './HostCard'
import PartyCard from './PartyCard'
import PartyDialog from './CreatePartyDialog'

export const GET_DATA_QUERY = gql`
  query getParties($id: ID!) {
    partylist: users(where: { id: $id }) {
      hosting {
        name
        location
        date
        invitees {
          name
        }
      }

      parties {
        name
        location
        date
        host {
          name
        }
      }
    }
  }
`

export default function PartiesList() {
  //   const theme = useTheme()
  const [u, setU] = React.useState('')
  console.log(u) // this seems to run, but the data is not retrieved again (its cached)

  // data will be of the form: data = {users: [{hosting: [partyinfo], parties: [partyinfo]}]}
  const { loading, error, data } = useQuery(GET_DATA_QUERY, {
    variables: { id: 1 },
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
        <PartyDialog update={setU} />
      </Grid>

      {data.partylist[0].hosting.map((p, i) => (
        <HostCard
          key={i}
          name={p.name}
          location={p.location}
          date={p.date}
          invitees={p.invitees}
        />
      ))}
      {data.partylist[0].parties.map((p, i) => (
        <PartyCard
          key={i}
          name={p.name}
          location={p.location}
          date={p.date}
          host={p.host.name}
        />
      ))}
    </React.Fragment>
  )
}

import React from 'react'
// import { useTheme } from '@material-ui/core/styles'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import HostCard from './HostCard'
import PartyCard from './PartyCard'

const GET_DATA_QUERY = gql`
  {
    users(where: { id: 1 }) {
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

  // data will be of the form: data = {users: [{hosting: [partyinfo], parties: [partyinfo]}]}
  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  console.log(data)
  return (
    <React.Fragment>
      <Title>Your Parties</Title>
      {data.users[0].hosting.map((p, i) => (
        <HostCard
          key={i}
          name={p.name}
          location={p.location}
          date={p.date}
          invitees={p.invitees}
        />
      ))}
      {data.users[0].parties.map((p, i) => (
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

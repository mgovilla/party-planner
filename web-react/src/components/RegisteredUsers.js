import React from 'react'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'
// import { Card, CardContent, Typography } from '@material-ui/core'
import UserCard from './UserCard'

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//     root: {
//       minWidth: 275
//     },
//   });

const GET_COUNT_QUERY = gql`
  query getUsers {
    users {
      id
      name
      email
    }
  }
`

export default function UsersList() {
  // const classes = useStyles();
  const { loading, error, data } = useQuery(GET_COUNT_QUERY)
  console.log(data)
  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Total Users</Title>
      {loading
        ? 'Loading'
        : data.users.map((u, i) => (
            <UserCard name={u.name} email={u.email} key={i} />
          ))}
    </React.Fragment>
  )
}

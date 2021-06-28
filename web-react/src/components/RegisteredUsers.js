import React from 'react'
import Title from './Title'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'

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

  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Link to={{ pathname: '/users' }}>
        <Title>Total Users</Title>
      </Link>
      {loading
        ? 'Loading'
        : data.users.map((u, i) => (
            <UserCard name={u.name} email={u.email} key={i} />
          ))}
    </React.Fragment>
  )
}

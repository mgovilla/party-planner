import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useQuery, gql } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

const GET_DATA_QUERY = gql`
  query getUsersButSelf($id: ID!) {
    users(where: { id_NOT: $id }) {
      id
      name
      email
    }
  }
`

export default function InviteUsers(props) {
  const { user } = useAuth0()

  const [open, setOpen] = React.useState(false)
  const { loading, error, data } = useQuery(GET_DATA_QUERY, {
    variables: { id: user.sub },
  })
  const [value, setValue] = React.useState(props.invitees)

  return (
    <Autocomplete
      multiple
      id="party-invite"
      open={open}
      fullWidth
      value={value}
      defaultValue={props.invitees}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      onChange={(_, v) => {
        setValue(v)
        props.onChange(_, v)
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={error ? [] : data.users}
      loading={loading}
      limitTags={5}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Invite People"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import InviteUsers from './InviteUsers'
import { useMutation, gql } from '@apollo/client'

const INVITE_USERS_MUTATION = gql`
  mutation inviteUsers($names: [String], $party: ID) {
    party: updateParties(
      where: { id: $party }
      connect: { invitees: { where: { name_IN: $names } } }
    ) {
      parties {
        id
        name
        invitees {
          id
          name
        }
      }
    }
  }
`

export const REMOVE_INVITE_MUTATION = gql`
  mutation deleteInvite($names: [String], $party: ID) {
    party: updateParties(
      where: { id: $party }
      disconnect: { invitees: { where: { name_IN: $names } } }
    ) {
      parties {
        id
        name
        invitees {
          id
          name
        }
      }
    }
  }
`

export default function InviteDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [invitees, setInvitees] = React.useState([])
  const [inviteUsers] = useMutation(INVITE_USERS_MUTATION, {
    update(cache, { data: { party } }) {
      // update the current cache of the party to include the list of parties (only required because of https://github.com/neo4j/graphql/issues/247 )
      let usersList = party.parties[party.parties.length - 1].invitees
      console.log('updating the cache with', usersList)
      cache.modify({
        id: cache.identify(party.parties[party.parties.length - 1]),
        fields: {
          invitees(existing = []) {
            cache.writeFragment({
              id: cache.identify(party.parties[party.parties.length - 1]),
              data: usersList,
              fragment: gql`
                fragment partyInvitees on Party {
                  invitees {
                    id
                    name
                  }
                }
              `,
            })

            console.log('existing inv', existing)
          },
        },
      })
    },
  })

  const [removeInvites] = useMutation(REMOVE_INVITE_MUTATION, {
    // eslint-disable-line no-unused-vars
    update(cache, { data: { party } }) {
      // update the current cache of the party to include the list of parties
      let usersList = party.parties[party.parties.length - 1].invitees
      console.log('updating the cache with', usersList)
      cache.modify({
        id: cache.identify(party.parties[party.parties.length - 1]),
        fields: {
          invitees(existing = []) {
            cache.writeFragment({
              id: cache.identify(party.parties[party.parties.length - 1]),
              data: usersList,
              fragment: gql`
                fragment partyInvitees on Party {
                  invitees {
                    id
                    name
                  }
                }
              `,
            })

            console.log('existing inv', existing)
          },
        },
      })
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    // Read the data and do a mutation

    if (props.invitees < invitees) {
      // add users
      inviteUsers({
        variables: { names: invitees.map((u) => u.name), party: props.partyId },
      })
    } else if (props.invitees > invitees) {
      removeInvites({
        variables: {
          names: props.invitees
            .filter((x) => !invitees.some((y) => y.name == x.name))
            .map((u) => u.name),
          party: props.partyId,
        },
      })
    }

    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary">
        Invite More!
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        fullWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">Invite Friends</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invite more friends to the party!
          </DialogContentText>

          <InviteUsers
            invitees={props.invitees}
            onChange={(_, v) => setInvitees(v)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

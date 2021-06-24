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
  mutation inviteUsers($names: [String], $party: String) {
    party: updateParties(
      where: { name: $party }
      connect: { invitees: { where: { name_IN: $names } } }
    ) {
      parties {
        name
      }
    }
  }
`

export default function InviteDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [invitees, setInvitees] = React.useState([])
  const [inviteUsers] = useMutation(INVITE_USERS_MUTATION)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    // Read the data and do a mutation
    console.log(invitees)
    inviteUsers({
      variables: { names: invitees.map((u) => u.name), party: props.partyName },
    })
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

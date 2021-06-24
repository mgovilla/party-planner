import React from 'react'
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import AddIcon from '@material-ui/icons/Add'
import DateFnsUtils from '@date-io/date-fns'
import InviteUsers from './InviteUsers'
import { useMutation, gql } from '@apollo/client'

const CREATE_PARTY_MUTATION = gql`
  mutation createParty(
    $id: ID!
    $name: String!
    $location: String
    $date: DateTime
    $host: ID
    $invitees: [String]
  ) {
    party: createParties(
      input: {
        id: $id
        name: $name
        location: $location
        date: $date
        host: { connect: { where: { id: $host } } }
        invitees: { connect: { where: { name_IN: $invitees } } }
      }
    ) {
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

export default function PartyDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [invitees, setInvitees] = React.useState([])
  const [createParty] = useMutation(CREATE_PARTY_MUTATION, {
    update(_, { data: { party } }) {
      console.log(party)
      props.update(party.parties[0].name)
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
    console.log(invitees)
    createParty({
      variables: {
        id: 1,
        name: document.getElementById('party-name').value,
        location: document.getElementById('party-location').value,
        date: selectedDate,
        host: 1,
        invitees: invitees.map((u) => u.name),
      },
    })

    setOpen(false)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
    console.log(selectedDate)
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        fullWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">Host Party</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the following information to Host a party of your own!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="party-name"
            label="Party Name"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="party-location"
            label="Location"
            fullWidth
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="party-date"
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="party-time"
                label="Select Time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <InviteUsers onChange={(_, v) => setInvitees(v)} />
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

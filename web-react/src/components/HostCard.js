import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import InviteDialog from './InviteMoreDialog'
import { GET_USER_PARTIES } from './PartiesList'
import { useAuth0 } from '@auth0/auth0-react'

const DELETE_PARTY = gql`
  mutation DeleteParty($name: String!) {
    deleteParties(where: { name: $name }) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`

const HostCard = ({ id, name, location, date, invitees }, key) => {
  const { user } = useAuth0()
  const theme = useTheme()
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(0),
      backgroundColor: '#EFEFEF',
      overflow: 'visible',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }))

  const classes = useStyles(theme)
  const [open, setOpen] = React.useState(false)
  const [deleteParty] = useMutation(DELETE_PARTY, {
    refetchQueries: [{ query: GET_USER_PARTIES, variables: { id: user.sub } }],
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    deleteParty({
      variables: {
        name: name,
      },
    })
    setOpen(false)
  }

  return (
    <Card className={classes.root} key={key}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h5" component="h2">
            {name} (Hosting)
          </Typography>
          <div>
            <IconButton onClick={handleClickOpen}>
              {' '}
              <CloseIcon />{' '}
            </IconButton>
            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Cancel Party'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to cancel {name}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  No
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(date).toLocaleString()}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Location: {location}
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography color="textSecondary">
            Attendees: {invitees.length}
          </Typography>
          <InviteDialog partyName={name} partyId={id} invitees={invitees} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HostCard

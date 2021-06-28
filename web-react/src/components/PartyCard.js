import {
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import { GET_USER_PARTIES } from './PartiesList'
import { REMOVE_INVITE_MUTATION } from './InviteMoreDialog'
import { useMutation } from '@apollo/client'
import CloseIcon from '@material-ui/icons/Close'
import { useAuth0 } from '@auth0/auth0-react'

const PartyCard = ({ id, name, location, date, host }, key) => {
  const { user } = useAuth0()
  const theme = useTheme()
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(0),
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
  const [removeInvite] = useMutation(REMOVE_INVITE_MUTATION, {
    refetchQueries: [{ query: GET_USER_PARTIES, variables: { id: user.sub } }],
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    removeInvite({
      variables: {
        names: [user.name],
        party: id,
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
            {name}
          </Typography>
          <div>
            <IconButton onClick={handleClickOpen}>
              {' '}
              <CloseIcon />{' '}
            </IconButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Cancel Party'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Not planning to go to {name}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Confirm
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
        <Typography color="textSecondary">Hosted by: {host}</Typography>
      </CardContent>
    </Card>
  )
}

export default PartyCard

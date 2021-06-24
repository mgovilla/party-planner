import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import InviteDialog from './InviteMoreDialog'

const HostCard = ({ name, location, date, invitees }, key) => {
  const theme = useTheme()
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(0),
      backgroundColor: '#dae2f0',
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

  return (
    <Card className={classes.root} key={key}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name} (Hosting)
        </Typography>
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
          <InviteDialog partyName={name} invitees={invitees} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default HostCard

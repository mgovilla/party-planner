import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const HostCard = ({ name, location, date, invitees }, key) => {
  const theme = useTheme()
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(0),
      backgroundColor: '#e3dcdc',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    row: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
      float: 'right',
    },
  }))

  const classes = useStyles(theme)

  return (
    <Card className={classes.root} key={key}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {date}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {location}
        </Typography>
        <div className={classes.row}>
          <Typography className={classes.pos} color="textSecondary">
            Attendees: {invitees.length}
          </Typography>
          <button className={classes.button}>Invite More!</button>
        </div>
      </CardContent>
    </Card>
  )
}

export default HostCard

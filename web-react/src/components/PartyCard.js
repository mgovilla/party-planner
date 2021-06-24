import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const PartyCard = ({ name, location, date, host }, key) => {
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

  return (
    <Card className={classes.root} key={key}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
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

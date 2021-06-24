import React from 'react'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import UserList from './components/UserList'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  // Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  // Link as MUILink,
} from '@material-ui/core'
import Dashboard from './components/Dashboard'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <MUILink color="inherit" href="https://grandstack.io/">
//         Party Planner
//       </MUILink>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   )
// }

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  appBarImage: {
    maxHeight: '75px',
    paddingRight: '20px',
  },
}))

export default function App() {
  const classes = useStyles()
  // const [open, setOpen] = React.useState(true)

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <img
              className={classes.appBarImage}
              src="img/grandstack.png"
              alt="GRANDstack logo"
            />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Welcome To Party Planner
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/businesses" component={UserList} />
              <Route exact path="/friends" component={UserList} />
            </Switch>
          </Container>
        </main>
      </div>
    </Router>
  )
}

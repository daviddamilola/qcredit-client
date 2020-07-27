import React from 'react';
import { Grid, List, ListItem, Button, Hidden } from "@material-ui/core/";
import SmHeader, { sideProvider, useSideProvider } from './Drawer';
import useAuth from '../context/authenticate';
import Sidebar from './Sidebar';
import Nav from './Nav';
import { useRouter } from 'next/router';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  dashboard: {
      margin: '0 auto',
      
  },
  canvas:{
      background: '#F6F6F6',
      height: '100vh',
  },
  center:{
    margin: '0 24px',
    [theme.breakpoints.down('sm')]: {
      
    }
  }

}));

export default function ApplyMain({ children }) {

  const classes = useStyles();

  const { show, setShow } = useSideProvider();

  const { logout } = useAuth();

  const router = useRouter();

  const mLinks = [
  { name: 'Home', route: '/welcome', icon: '/img/home.svg' },
    { name: 'Apply', route: '/apply', icon: '/img/home.svg' },
    { name: 'History', route: '/history', icon: '/img/home.svg' },
    { name: 'Active Loans', route: '/active-loans', icon: '/img/home.svg' },
  ]

  return (
    <>
      <Grid container>
        <Hidden smDown>
          <Grid item md={2} lg={2}>
            <Sidebar mLinks={mLinks} />
          </Grid>
        </Hidden>
        <section className="col-10 mainDashboard">
          <Nav name={mLinks.find(each => each.route === router.pathname)?.name}/>
          <div id="canvas" className={classes.canvas}>
            <div className={classes.center}>
            {children}
            </div>
          </div>
        </section>
      </Grid>
    </>
  )
}


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Sidebar from './Sidebar';
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from 'next/router'
import {
    Fab,
    IconButton
  } from "@material-ui/core/";

const useStyles = makeStyles({
  list: {
    //width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();

  const router = useRouter()


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const mLinks = [
        {name:'Home', route: '/', icon: '/img/home.svg'},
        {name:'Verify Clients', route: '/verify', icon: '/img/home.svg'},
        {name:'Current Loans', route: '/current-loans', icon: '/img/home.svg'},
        {name:'Loan Applications', route: '/loan-applications', icon: '/img/home.svg'},
        {name:'Repaid Loans', route: '/repaid-loans', icon: '/img/home.svg'},
        {name:'Repayments', route: '/client-repayment', icon: '/img/home.svg'},
    ]

  const userLinks = [
    { name: 'Apply', route: '/apply', icon: '/img/home.svg' },
    { name: 'History', route: '/history', icon: '/img/home.svg' },
  ]

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{background:' #595959', height: '100vh'}}
    >
      { ['/apply', '/history'].includes(router.pathname )?<Sidebar mLinks={userLinks} />: <Sidebar mLinks={mLinks} />}
    </div>
  );

  return (
    <div>
      <IconButton style={{color: '#F2C744', padding:'0px'}}
              aria-label="navbar"
              component="span" onClick={toggleDrawer('left', true)}> <MenuIcon /></IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

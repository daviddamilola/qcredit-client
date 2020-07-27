import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Grid, Button, Hidden } from "@material-ui/core/";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import DrawerMain from './DrawerMain';
import useAuth from '../context/authenticate';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    main: {
        boxShadow: 'none'
    },
    appbar:{
        background: '#F6F6F6',
        padding: '0em 24px',
        display: 'flex',
        boxShadow: 'none',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            padding: '0 24px'
        }
    },
    title:{
        color: '#F2C744',
        fontWeight: 'bolder',
    },
    navActions: {
        display: 'flex',
        alignItems: 'center',
        '& > *':{
            marginLeft: '1em'
        }
    },
    button: {
        height: '2.2em',
        boxShadow: 'none'
    }
}))

function Nav({name}) {
    const classes = useStyles();
    const { logout } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState(null);

     const isMenuOpen = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
       setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
    </Menu>
  );

    return (
    <>
        <AppBar position="static" className={classes.main}>
                            <Toolbar className={classes.appbar}>
                                <Typography variant="h6" className={classes.title}>
                                    {name}
                                </Typography>
                                <Grid className={classes.navActions}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="primary"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Button className={classes.button} color='primary' onClick={() => logout()} variant='contained'>Logout</Button>
                                <Hidden mdUp><DrawerMain /></Hidden>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                        {renderMenu}
                        </>
    )
}

export default Nav

import React, { useRef, useState, useEffect } from 'react';
import SmHeader, { sideProvider, useSideProvider } from './Drawer';
import { Grid, Button, Hidden } from "@material-ui/core/";
import { LoansProvider } from '../context/loans';
import Sidebar from './Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import DrawerMain from './DrawerMain';
import Nav from './Nav';


const useStyles = makeStyles(theme => ({
    dashboard: {
        margin: '0 24px',
        
    },
    canvas:{
        background: '#F6F6F6',
        height: '100vh'
    },

}));

function Dashboard({ children }) {
    const classes = useStyles();
    const router = useRouter();



    
    const mLinks = [
        { name: 'Home', route: '/admin', icon: '/img/home.svg' },
        { name: 'Verify Clients', route: '/admin/verify', icon: '/img/home.svg' },
        { name: 'Current Loans', route: '/admin/current-loans', icon: '/img/home.svg' },
        { name: 'Loan Applications', route: '/admin/loan-applications', icon: '/img/home.svg' },
        { name: 'Repaid Loans', route: '/admin/repaid-loans', icon: '/img/home.svg' },
        { name: 'Repayments', route: '/admin/client-repayment', icon: '/img/home.svg' },
    ];

    return (
        <>
            <LoansProvider>
                <Grid container >
                    <Hidden smDown>
                        <Grid item md={3} lg={2}>
                            <Sidebar mLinks={mLinks} />
                        </Grid>
                    </Hidden>
                    <Grid item md={9} lg={10} sm={12}>
                        <Nav name={ mLinks.find(each => each.route === router.pathname)?.name}/>
                        <div id="canvas" className={classes.canvas}>
                            <Grid item md={12} lg={12} className={classes.dashboard}>
                                {children}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </LoansProvider>
        </>
    )
}


export default Dashboard;
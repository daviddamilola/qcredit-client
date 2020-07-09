import React from 'react';
import { useRouter } from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import { Grid,Box, List, ListItem, Button, Typography, Paper } from "@material-ui/core/";


const useStyles = makeStyles(theme => ({
    paper: {
        boxShadow: '0px 4px 4px rgba(222, 218, 218, 0.25);',
        borderRadius: '8px',
        padding: '0.8em 1.2em',
        width: '28%',
        height: '80px',
        [theme.breakpoints.down('lg')]:{
            width: '25%',
        },
        [theme.breakpoints.down('md')]:{
            width: '22%',
        },
        [theme.breakpoints.down('xs')]:{
            width: '30%',
            marginRight: '0.3em'
        }
    },
    
  }));


function InfoCard({children}) {
    const router = useRouter();
    const classes = useStyles();
    return (
            <Paper className={classes.paper}>
                {children}
            </Paper>
    )
}

export default InfoCard

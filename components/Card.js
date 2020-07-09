import React from 'react';
import { useRouter } from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import { Grid,Box, List, ListItem, Button, Typography, Paper } from "@material-ui/core/";


const useStyles = makeStyles(theme => ({
    paper: {
        boxShadow: '0px 4px 4px rgba(222, 218, 218, 0.25);',
        borderRadius: '8px',
        padding: '0.8em 1.2em',
        height: '100%'
    },
    
  }));


function Card({children}) {
    const router = useRouter();
    const classes = useStyles();
    return (
            <Paper className={classes.paper}>
                {children}
            </Paper>
    )
}

export default Card

import React from 'react';
import { useRouter } from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import { Grid, List, ListItem, Button, Typography, Paper } from "@material-ui/core/";


const useStyles = makeStyles(theme => ({
    paper: {
        boxShadow: 'none',
        borderRadius: '8px',
        padding: '1.5em 1em',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '1.5em'
    },
    center: {
        textAlign: 'center',
    }
  }));


function FormCard({children, title}) {
    const router = useRouter();
    const centered = ['/signin', '/signup'].includes(router.pathname)? true : false
    const classes = useStyles();
    return (
        <Grid item sm={12} md={5} lg={4}>
            <Paper className={classes.paper}>
                <Typography variant='body1' className={`${classes.title} ${centered ? classes.center : ''}`}>{title}</Typography>
                {children}
            </Paper>
        </Grid>
    )
}

export default FormCard

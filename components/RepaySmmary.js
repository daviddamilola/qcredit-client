import React from 'react';
import { useRouter } from 'next/router';
import {makeStyles} from '@material-ui/core/styles';
import { Grid,Box, List, ListItem, Button, Typography, Paper } from "@material-ui/core/";


const useStyles = makeStyles(theme => ({
   
    
  }));


function RepaySumary({repayments}) {
    const router = useRouter();
    const classes = useStyles();
    return (
           <List>
                {repayments.map((eachRepayment, i) => {
                        <ListItem key={i}>

                        </ListItem>
                })}
           </List>
    )
}

export default RepaySumary;

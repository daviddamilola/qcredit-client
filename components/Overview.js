import React from 'react';
import InfoCard from './InfoCard';
import { Grid, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Card from './Card';


const useStyles = makeStyles(theme => ({
    infoOverview:{
        display: 'flex',
        justifyContent: 'space-between',
        
        '& > *':{
            
        },
        [theme.breakpoints.down('md')]:{
            '& > *':{
                marginRight: '0rem'
            },
        },
        [theme.breakpoints.down('xs')]:{
            width: '300%',
            overflowX: 'scroll',
        }
    },
    infoName:{
        fontSize: '1.2rem',
        [theme.breakpoints.down('md')]:{
           fontSize: '1rem'
        }
    },
    infoNumber:{
        fontSize: '1.4rem',
        fontWeight: 'bold',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
        minHeight: '3rem',
    },
    smFw: {
        [theme.breakpoints.down('sm')]:{
            width: '100%',
         },
    },
    approved: {
        marginBottom: '1rem',
        
    },
    approvedDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    approvedDetails_text: {
        [theme.breakpoints.down('sm')]:{
            fontSize: '2rem'
         },
    },
    percent: {
        [theme.breakpoints.down('sm')]:{
            fontSize: '2rem'
         },
    },
    approvedPercent:{
        width: '10em',
        height: '10em',
        borderRadius: '100%',
        border: '6px solid #E4B60F',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        [theme.breakpoints.down('sm')]:{
            width: '5em',
        height: '5em',
        },
    },
    topLenders:{
        height: '100%',
        width: '30%',
        [theme.breakpoints.down('sm')]:{
            width: '100%',
            marginTop: '1em'
        },
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    totalDetails:{
        width: '10%',
        [theme.breakpoints.down('lg')]:{
            width: '15%',
        },
        [theme.breakpoints.down('md')]:{
            width: '20%',
        },
        [theme.breakpoints.down('xs')]:{
            width: '30%',
        }
    },
    totalNumber:{
        fontSize: '1.3rem',
        textAlign: 'left',
    },
    totalTitle:{
        fontSize: '1rem'
    },
    totalInterest:{
        fontSize:'0.8rem'
    },
    infowrapper:{
        [theme.breakpoints.down('xs')]:{
            overflowX: 'scroll',
        }
    }
}))

function Overview() {
    const classes = useStyles();
    return (
       <>
       <div className={classes.infowrapper}>
           <Grid item md={8} sm={12} lg={8}className={classes.infoOverview} >
                <InfoCard>
                    <Typography variant='body2' className={classes.infoName}>Pending Users</Typography>
                    <Typography variant='body1' className={classes.infoNumber}>1</Typography>
                </InfoCard>
                <InfoCard>
                    <Typography variant='body2' className={classes.infoName}>Loan Applications</Typography>
                    <Typography variant='body1' className={classes.infoNumber}>1</Typography>
                </InfoCard>
                <InfoCard>
                    <Typography variant='body2' className={classes.infoName}>Repayments</Typography>
                    <Typography variant='body1' className={classes.infoNumber}>1</Typography>
                </InfoCard>
           </Grid>
        </div>

           <Grid container className={classes.details}>
               <Grid item md={8} lg={8} sm={12} className={classes.smFw}>
                    <Grid item md={12} lg={12} sm={12} className={classes.approved}>
                        <Card>
                            <Typography className={classes.infoName}>
                                Approved Applications
                            </Typography>
                            <div className={classes.approvedDetails}>
                                <div>
                                    <Typography variant='h3' className={classes.approvedDetails_text}>£50, 000</Typography>
                                    <Typography variant='body2'>interest: £3000</Typography>
                                </div>
                                <div className={classes.approvedPercent}>
                                <Typography variant='h2' className={classes.percent}>90%</Typography>
                                </div>

                            </div>
                        </Card>    
                    </Grid>
                    <Grid item md={12} lg={12} sm={12}> 
                        <Card>
                            <div className={classes.total}>
                                <Typography className={classes.totalTitle}>
                                    TOTAL LOANS
                                </Typography>
                                <div className={classes.totalDetails}>
                                <Typography variant='h3' className={classes.totalNumber}>
                                    £50, 000 
                                </Typography>
                                <Typography variant='body2' className={classes.totalInterest}>
                                    Interest: £3,000 
                                </Typography>
                                </div>
                            </div>
                        </Card>  
                    </Grid>
               </Grid>
               <div className={classes.topLenders}>
               <Card>
                    <Typography className={classes.infoName}>
                        Top Lenders
                    </Typography>
               </Card>
               </div>
           </Grid>
       </>
    )
}

export default Overview

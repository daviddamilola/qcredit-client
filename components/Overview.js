import React from 'react';
import InfoCard from './InfoCard';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';
import {format} from '../utils';
import {useSpring, animated} from 'react-spring'


const useStyles = makeStyles(theme => ({
    infoOverview: {
        display: 'flex',
        justifyContent: 'space-between',

        '& > *': {

        },
        [theme.breakpoints.down('md')]: {
            '& > *': {
                marginRight: '0rem'
            },
        },
        [theme.breakpoints.down('xs')]: {
            width: '300%',
            overflowX: 'scroll',
        }
    },
    infoName: {
        fontSize: '1.2rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem'
        }
    },
    infoNumber: {
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
        [theme.breakpoints.down('sm')]: {
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
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        },
    },
    percentAnim: {
        // transition: 'stroke-dashoffset 4s',
   
    },
    percent: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        },
    },
    approvedPercent: {
        width: '10em',
        height: '10em',
        borderRadius: '100%',
        border: '6px solid #E4B60F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '5em',
            height: '5em',
        },
    },
    topLenders: {
        height: '100%',
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: '1em'
        },
    },
    total: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    totalDetails: {
        width: '16%',
        [theme.breakpoints.down('lg')]: {
            width: '17%',
        },
        [theme.breakpoints.down('md')]: {
            width: '20%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '30%',
        }
    },
    totalNumber: {
        fontSize: '1.3rem',
        textAlign: 'left',
    },
    totalTitle: {
        fontSize: '1rem'
    },
    totalInterest: {
        fontSize: '0.8rem'
    },
    infowrapper: {
        [theme.breakpoints.down('xs')]: {
            overflowX: 'scroll',
        }
    }
}))

function Overview({pending, applications, repayments, top, approved, repaid, total}) {
    const circleRef = React.createRef(null)
    
    const classes = useStyles();
    const [circumference, setCircumference] = React.useState(0)
    const [percent, setPercent] = React.useState(0);
    const styleProp = useSpring({
        offset: percent
     })




    
   
    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        return offset
      }

    React.useEffect(() => {
        const percent = Math.round((parseInt(repaid, 10)/ parseInt(approved, 10)) * 100);
        const radius = circleRef.current.r.baseVal.value;
        const getCir = radius * 2 * Math.PI;
        console.log(percent)
        setPercent(percent)
        setCircumference(getCir)
    }, [])
    return (
        <>
            <div className={classes.infowrapper}>
                <Grid item md={8} sm={12} lg={8} className={classes.infoOverview} >
                    <InfoCard>
                        <Typography variant='body2' className={classes.infoName}>Pending Users</Typography>
                        <Typography variant='body1' className={classes.infoNumber}>{pending}</Typography>
                    </InfoCard>
                    <InfoCard>
                        <Typography variant='body2' className={classes.infoName}>Pending Applications</Typography>
                        <Typography variant='body1' className={classes.infoNumber}>{applications}</Typography>
                    </InfoCard>
                    <InfoCard>
                        <Typography variant='body2' className={classes.infoName}>Repayments</Typography>
    <Typography variant='body1' className={classes.infoNumber}>{repayments}</Typography>
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
                                    <Typography variant='h3' className={classes.approvedDetails_text}>{format(approved)}</Typography>
                                    <Typography variant='body2'>interest: £3000</Typography>
                                </div>
                                {console.log(styleProp)}
                                <svg width='240' height='200' xmlns='http://www.w3.org/2000/svg'>
                                    <animated.circle 
                                    className={classes.percentAnim}
                                    ref={circleRef} strokeDasharray={`${circumference} ${circumference}`} 
                                    strokeDashoffset={`${styleProp.offset.value}`} 
                                    cx='150' cy='90' r='80' style={{ stroke: '#F2C744', fill: 'transparent', }} strokeWidth="10" strokeLinecap="round" />
                                    <text x="150" y="110" fontSize="40" textAnchor="middle" fill="#424242">{percent}%</text>
                                </svg>

                            </div>
                        </Card>
                    </Grid>
                    <Grid item md={12} lg={12} sm={12}>
                        <Card>
                            <div className={classes.total}>
                                <Typography className={classes.totalTitle}>
                                    TOTAL REPAID LOANS
                                </Typography>
                                <div className={classes.totalDetails}>
                                    <Typography variant='h3' className={classes.totalNumber}>
                                        {format(repaid)}
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

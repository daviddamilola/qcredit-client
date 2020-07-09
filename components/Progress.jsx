import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },

  },
}));

export default function CircularIndeterminate({color='#FF5C00', size=24}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{color: color}}  size={24} />
    </div>
  );
}
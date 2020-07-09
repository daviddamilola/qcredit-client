import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: '1em 0',
      '& > * + *': {
        margin: '1em 0',
      },
    },
  }));


function CAlert({show, remote}) {
  const classes = useStyles();
  console.log(show)
  const [open, setOpen] = React.useState(show?.status? show.status : false);

  React.useEffect(() => {
    console.log('ran')
    const id = setTimeout(() => {
        console.log('ran2')
        setOpen(false)
        if(remote)remote({
            status: false,
            message: '',
            severity:''
        })
    }, 5000)

    return () => clearTimeout(id)
}, [show])
    return (
        <Collapse in={open} className={classes.root}>
        <Alert
          severity={show?.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {show?.message}
        </Alert>
      </Collapse>
    )
}

export default CAlert;

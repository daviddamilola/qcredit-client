import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    borderRadius: '4px',
  },
  drop: {
    background: '#fff',
    width: '140px',
    borderRadius: '5px',
    padding: '1rem 0',
    overflowX: 'hidden',
  },
  button: {
      width: '100%',
      border: 'none',
      marginBottom: '0.5rem',
      padding: '0.5rem ',
      cursor: 'pointer',
  },
  selected: {
      background: '#EEEEEE',
  }
}));

export default function TransitionsPopper({currFilter='', options=[], setFilter=() => {}}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div>
      <span onClick={handleClick} aria-describedby={id} >
        <span style={{margin: '0 1rem'}}>{currFilter}</span>
      <img src={'/img/dropdown.svg'} style={{cursor: 'pointer',}}  />
      </span>
      
      <Popover 
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className={classes.drop}>
        {options.map((each, i)=> <p key={i} variant='text' className={`${classes.button} ${currFilter === each ? classes.selected: ''}`} onClick={() => setFilter(each)}>{each}</p>)}
            </div>
        </Popover>

    </div>
  );
}


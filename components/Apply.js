import React, {useRef, useState} from 'react';
import useValidation from '../libs/useValidation';
import api from '../services/api';
import Spinner from './spinner';
import authGetter from '../libs/auth';
import FormCard from './FormCard';
import {Grid, Typography, Button} from '@material-ui/core';
import CssTextField from './CssInput';
import  {makeStyles} from '@material-ui/core/styles';
import Alert from './Alert';
import InlineLoader from './InlineLoader';


const useStyles = makeStyles(theme => ({
      textfield: {
        fontWeight: 'bold !important',
    },
    inputCont: {
      marginBottom: '1rem'
  },
  button: {
    background: '#F2C744',
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: 'none'
  }
}))

export default function Apply(){
    const formRef = useRef(null);

    const classes = useStyles();

    const [show, setShow] = useState({
      status: false,
      message: '',
      severity:''
    })

    const [loading, setLoading] = React.useState(false);

    const [apply, setApply] = useState({
        amount: '',
        tenor: '',
      });

    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(apply).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
        process.nextTick(() => {
          if(Object.values(formIsValid).every(each => true)){
            setLoading(true)
            api.defaults.headers.Authorization = authGetter()?.token;
            api.post('/loans', apply)
              .then(response => {
                console.log(Response)
              })
              .catch(err => {
                console.log(err.response)
                if(err.response.status < 500) return setShow({
                  status: true,
                  message: `${err?.response?.data?.error}`,
                  severity: 'error'
              })
              setShow({
                  status: true,
                  message: `an error occurred try again later`,
                  severity: 'error'
              })
              })
              .finally(() => {
                setLoading(false)
              })
          }
        })
    }

    const handleChange= (e) => {
        setApply({...apply,
        [e.target.name]: e.target.value})
    }

    const errorMessageStyle = {
      color: "red",
      fontSize: "10px",
      fontWidth: "bolder",
      fontStyle: "oblique"
    };

    return(
        <>
        <Grid container>
            <FormCard title='Loan Application'>
            {show.status && <Alert show={show} remote={setShow}/>}
                <form ref={formRef} onSubmit={handleSubmit}>
                <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Tenor
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          required
                          fullWidth
                          inputProps={
                            {type:"number", min:"1", max:"12", step:"1"}
                          }
                          id="tenor"
                          type="text"
                          placeholder="tenor"
                          name="tenor"
                          value={apply.tenor}
                          onChange={handleChange}
                        />
                        {errors?.tenor && (
                          <span style={errorMessageStyle}>{errors?.tenor}</span>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Amount
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          inputProps={
                            {min:"1000", max:"100000", step:"1000", id:"amount"}
                          }
                          required
                          fullWidth
                          id="amount"
                          type="number"
                          placeholder="amount"
                          name="amount"
                          value={apply.amount}
                          onChange={handleChange}
                        />
                        {errors?.amount && (
                          <span style={errorMessageStyle}>{errors?.amount}</span>
                        )}
                      </Grid>
                      <Button type='submit' className={classes.button} variant='contained'>{loading? <InlineLoader /> : 'Apply'}</Button>
                </form>
              </FormCard>
            </Grid>
        </>
    )
}
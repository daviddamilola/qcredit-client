import React, {useRef, useState} from 'react';
import Layout from '../components/Layout';
import Spinner from '../components/spinner';
import useValidation from '../libs/useValidation';
import api from '../services/api';
import Router from 'next/router';
import useAuth from '../context/authenticate';
import FormCard from '../components/FormCard';
import {Grid, Typography, Button} from '@material-ui/core';
import CssTextField from '../components/CssInput';
import  {makeStyles} from '@material-ui/core/styles';
import InlineLoader from '../components/InlineLoader';
import Alert from '../components/Alert';


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
    boxShadow: 'none',
    width: '100%',
  },
  mb_2:{
      marginBottom: '2em',
  },
  center: {
      alignItems: 'center',
      justifyContent: 'center',
      height:' 90%',
  },
  prompt: {
      fontSize: '0.8rem',
      textAlign: 'center',
      marginTop: '1em',
      '& > a': {
          color: '#F2C744'
      }
  }
}))

export default function SignIn() {
    const classes  = useStyles();
    
    React.useEffect(() => {
        Router.prefetch('/admin')
        Router.prefetch('/apply')
    })

    const { user, login} = useAuth();

    const [show, setShow] = useState({
        status: false,
        message: '',
        severity:''
    })

    const formRef = useRef(null);

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        rememberMe: '',
      });

    const [loading, setLoading] = useState(false)
    
    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(inputs).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
        process.nextTick(() => {
            if(Object.values(formIsValid).every(each => each)){
                setLoading(true)
                login(inputs)
                    .then((response)=> {
                        console.log(response)
                        const {data: {data: {token, privi, status, error}}} = response;
                        if([200, 201].includes(response.status)) setShow({
                            status: true,
                            message: 'success',
                            severity: 'success'
                        });
                        
                        localStorage.setItem('auth', token)
                        localStorage.setItem('privi', privi)
                        if(user.isadmin) {
                            return Router.push('/admin')
                        }else{
                            return Router.push('/welcome')
                        }
                    })
                    .catch(err => {
                        console.log(err.response)
                        if(err?.response?.status >= 400) return setShow({
                            status: true,
                            message: err?.response?.data?.error,
                            severity: 'error'
                        })
                        setShow({
                            status: true,
                            message: err.toString(),
                            severity: 'error'
                        })
                        console.log(err.response)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        })
    }

    const handleChange= (e) => {
        if(e.target.name === 'rememberMe') {
            return setInputs(prev=> ({
                ...prev,
                rememberMe: !prev.rememberMe,
            }))
        }
        setInputs({...inputs,
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
                <Layout>
                   <Grid container className={classes.center}>
                   <FormCard title='Login'>
                        {show.status && <Alert show={show} remote={setShow}/>}
                        <form onSubmit={handleSubmit} ref={formRef} method="post" >

                        <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Email
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
                          id="email"
                          type="email"
                          placeholder="email"
                          name="email"
                          value={inputs.email}
                          onChange={handleChange}
                        />
                        {errors?.email && (
                          <span style={errorMessageStyle}>{errors?.email}</span>
                        )}
                      </Grid>

                        <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Password
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          required
                          fullWidth
                          inputProps={
                            {type:"password", id:"passwd", pattern:"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$",
                                        title:"Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                        }
                          }
                          id="tenor"
                          type="password"
                          placeholder="Password" 
                          name='password'
                          value={inputs.password}
                          onChange={handleChange}
                        />
                        {errors?.password && (
                          <span style={errorMessageStyle}>{errors?.password}</span>
                        )}
                      </Grid>
                      <div className={classes.mb_2}>
                        <input onChange={handleChange} type="checkbox" name='rememberMe' id="remember" checked={inputs.rememberMe}/> Remember me
                        <span className="error"></span>
                      </div>
                      <Button type='submit' className={classes.button} variant='contained'>{loading? <InlineLoader /> : 'Login'}</Button>
                      <p className={classes.prompt}>Dont have an account? <a href="/signup">sign Up</a></p>
                            
                        </form>
                    </FormCard>
                    </Grid>
                </Layout>
        </>
    )
}



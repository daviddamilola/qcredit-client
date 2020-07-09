import React, {useRef, useState} from 'react';
import Layout from '../components/Layout';
import useValidation from '../libs/useValidation';
import useAuth from '../context/authenticate';
import InlineLoader from '../components/InlineLoader';
import api from '../services/api';
import Router from 'next/router';
import FormCard from '../components/FormCard';
import {Grid, Typography, Button} from '@material-ui/core';
import CssTextField from '../components/CssInput';
import {makeStyles} from '@material-ui/core/styles';
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

export default function SignUp(){

    const formRef = useRef(null);

    const classes = useStyles();

    const { user, signUp} = useAuth();

    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState({
        status: false,
        message: '',
        severity:''
    })

    const errorMessageStyle = {
        color: "red",
        fontSize: "10px",
        fontWidth: "bolder",
        fontStyle: "oblique"
      };

    const [inputs, setInputs] = useState({
        email: '',
        firstName: '',
        phonenumber: '',
        lastName: '',
        password:'',
        address: '',
        cfpassword:'',
        termsOfService:'',
      });
    
    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(inputs).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
                console.log(Array.from(formRef.current.querySelectorAll('input')))
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
          process.nextTick(() => {
            if(Object.values(formIsValid).every(each => each)){
                setLoading(true)
                signUp(inputs)
                    .then((response)=> {
                        console.log(response)
                        const token = response.data.data.token;
                        localStorage.setItem('auth', token)
                        if([200, 201].includes(response.status)) setShow({
                            status: true,
                            message: 'success',
                            severity: 'success'
                        });
                        console.log('user is', user)
                        if(user.isadmin) {
                            localStorage.setItem('privi', 2)
                            return Router.push('/admin')
                        }else{
                          localStorage.setItem('privi', 1)
                            return Router.push('/apply')
                        }
                    })
                    .catch(err => {
                        if(!err.response){
                          return setShow({
                            status: true,
                            message: `${err.toString()}`,
                            severity: 'error'
                        })
                        }
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
                        console.log(err.response)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        })
    }

    const handleChange= (e) => {
        if(e.target.name === 'termsOfService') {
            return setInputs(prev=> ({
                ...prev,
                termsOfService: !prev.termsOfService,
            }))
        }
        setInputs({...inputs,
        [e.target.name]: e.target.value})
    }

    

    return(
        <>
            <Layout>
                <Grid container className={classes.center}>
            <FormCard title='Sign Up'>
            {show?.status && <Alert show={show} remote={setShow}/>}
                        <form ref={formRef} onSubmit={handleSubmit} method="post" className="container validate">
                                
                        <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Email
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
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
                      <Grid container spacing={2} className={classes.justify}>
                      <Grid item xs={12} sm={12} md={6}  className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          First name
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          required
                          fullWidth
                          id="firstName"
                          type="firstName"
                          placeholder="firstName"
                          name="firstName"
                          value={inputs.firstName}
                          onChange={handleChange}
                        />
                        {errors?.firstName && (
                          <span style={errorMessageStyle}>{errors?.firstName}</span>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Last name
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          required
                          fullWidth
                          id="lastName"
                          type="lastName"
                          placeholder="lastName"
                          name="lastName"
                          value={inputs.lastName}
                          onChange={handleChange}
                        />
                        {errors?.lastName && (
                          <span style={errorMessageStyle}>{errors?.lastName}</span>
                        )}
                      </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Phone Number
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          inputProps={
                            {pattern:".{11,11}", step:"1000", title:"invalid phone number length 11"}
                          }
                          required
                          fullWidth
                          id="phonenumber"
                          type="phone"
                          placeholder="phonenumber"
                          name="phonenumber"
                          value={inputs.phonenumber}
                          onChange={handleChange}
                        />
                        {errors?.phonenumber && (
                          <span style={errorMessageStyle}>{errors?.phonenumber}</span>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Address
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          required
                          fullWidth
                          id="address"
                          type="text"
                          placeholder="address"
                          name="address"
                          value={inputs.address}
                          onChange={handleChange}
                        />
                        {errors?.address && (
                          <span style={errorMessageStyle}>{errors?.address}</span>
                        )}
                      </Grid>
                      <Grid container spacing={2} className={classes.justify}>
                      <Grid item xs={12} sm={12} md={6} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Password
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          inputProps={
                            {type:"password", id:"passwd", pattern:"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$",
                                        title:"Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                        }
                          }
                          required
                          fullWidth
                          id="password"
                          type="password"
                          placeholder="password"
                          name="password"
                          value={inputs.password}
                          onChange={handleChange}
                        />
                        {errors?.password && (
                          <span style={errorMessageStyle}>{errors?.password}</span>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Confirm Password
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          inputProps={
                            {type:"password", id:"passwd", pattern:"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$",
                                        title:"Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                        }
                          }
                          required
                          fullWidth
                          id="cfpassword"
                          type="cfpassword"
                          placeholder="confirm password"
                          name="cfpassword"
                          value={inputs.cfpassword}
                          onChange={handleChange}
                        />
                        {errors?.cfpassword && (
                          <span style={errorMessageStyle}>{errors?.cfpassword}</span>
                        )}
                      </Grid>
                      </Grid> 
                        <div className={classes.mb_2}>
                            <input type="checkbox" name="termsOfService" onChange={handleChange} value={inputs.termsOfService} required/> i accept <a href="/termsofservice.html">terms
                                of service*</a>
                            <span className="error"></span>
                        </div>
                        <Button type='submit' className={classes.button} variant='contained'>{loading? <InlineLoader /> : 'Register'}</Button>
                        <p className={classes.prompt}>Already have an account? <a href="/signin">login</a></p>
                    </form>
                 </FormCard>
                 </Grid>
            </Layout>
        </>
    )
}


   
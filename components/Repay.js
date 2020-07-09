import React, {useRef, useState} from 'react';
import useValidation from '../libs/useValidation';
import useLoans from '../context/loans';
import CssTextField from '../components/CssInput';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '../components/Alert';
import FormCard from '../components/FormCard';
import {Grid, Typography, Button} from '@material-ui/core';
import InlineLoader from '../components/InlineLoader';

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

export default function Repay({id}){
    const formRef = useRef(null);

    const classes = useStyles();

    const {makeRepayment} = useLoans();

    const [loading, setLoading] =  React.useState(false)

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    const [client, setClient] = useState({
        amountPaid: ''
      });

    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(client).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
          process.nextTick(async () => {
            if(Object.values(formIsValid).every(each => each)){
              setLoading(true)
              try {
                  const response = await makeRepayment(client, id);
                  if(response.status === 400 )throw (response);
                  setShow({
                    status: true,
                    message: 'success',
                    severity: 'error'
                })
              } catch (error) {
                setShow({
                    status: true,
                    message: 'an error occured',
                    severity: 'error'
                })
              }
            }
          })
    }

    const handleChange= (e) => {
        setClient({...client,
        [e.target.name]: e.target.value})
    }

    return(
        <>
        <Grid container>
            <FormCard title='Loan Repayment'>
            {show.status && <Alert show={show} remote={setShow}/>}
                <form ref={formRef} onSubmit={handleSubmit}>
                <Grid item xs={12} sm={12} className={classes.inputCont}>
                        <Typography variant="body2" className={classes.typography}>
                          Amount
                        </Typography>
                        <CssTextField
                          size="small"
                          variant="outlined"
                          className={classes.textfield}
                          required
                          fullWidth
                          inputProps={
                            {type:"number"}
                          }
                          id="amountPaid"
                          type="number"
                          placeholder="enter amount to pay"
                          name="amountPaid"
                          value={client.amountPaid}
                          onChange={handleChange}
                        />
                        {errors?.amountPaid && (
                          <span style={errorMessageStyle}>{errors?.amountPaid}</span>
                        )}
                      </Grid>
                      <Button type='submit' className={classes.button} variant='contained'>{loading? <InlineLoader /> : 'Make Repayment'}</Button>
                </form>
            </FormCard>
        </Grid>
            {/* <div className="tabcontent" id="repay4client">
                        <div className="container card mt-4">
                            <div className="cardBadge col col__Center">
                                CLIENT LOAN REPAYMENT
                            </div>
                            <div className="cardBody pb-2">
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <div className="container col-10 applyForm row row__spread">
                                        <div className="container col-6 col col___Center">
                                            <div className="inputGrp">
                                                <label htmlFor="amountPaid">Amount<span className="required">*</span></label>
                                                <input type="number" onChange={handleChange} value={client.amountPaid} name="amountPaid" id="amount" placeholder="enter amount"
                                                    required/>
                                            </div>
                                            
                                            <div className="col-12 col col__Center">
                                                <button type="submit" className="btn">Make Payment</button>
                                            </div>

                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div> */}
        </>
    )
}
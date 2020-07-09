import React from 'react';
import useLoans from '../context/loans';
import { moneyConvert } from '../libs/utils';
import Table from './Table';
import {Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Alert from './Alert';

const useStyles= makeStyles(theme => ({
    center: {
        justifyContent: 'center'
    }
}))

function RepaidLoans() {

    const { fullyPaid, reset,} = useLoans();

    const [loans, setLoans] = React.useState([]);

    const classes = useStyles();

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    React.useEffect(() => {
        const loadLoans = async() => {
            try {
                const loans = await fullyPaid();
                setLoans(loans);
            } catch (error) {
                if(error.status) console.log('error is', error);
                setShow({
                    status: true,
                    message: `${error.data.error}`,
                    severity: 'error'
                })
            }
            
        }
        loadLoans();
    }, [reset])

    const columns=  ['Email','Status', 'Tenor', 'Installment', 'Balance']
    const lists= loans;
    const values= ['users', 'status', 'tenor', 'paymentinstallment', 'balance'];
    

    return (
        <Grid container >
        {show.status && <Alert show={show} remote={setShow}/>}
        <Table name='Repaid Loans' 
        columns={columns} 
        lists={lists} 
        values={values} 
         />
        </Grid>
    )
}

export default RepaidLoans

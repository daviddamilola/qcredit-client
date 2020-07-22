
import React, {useEffect} from 'react'
import useLoans from '../context/loans';
import Table from './Table';
import {Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
export default function History() {

    const [history, setHistory] = React.useState([]);
    const {loans} = useLoans();


    useEffect(() => {
       setHistory(loans)
    }, [loans])

    const columns=  ['Amount', 'Tenor', 'Installment', 'Fully Paid', 'Balance', 'Status']
    const lists= history;
    const values= ['amount', 'tenor', 'paymentInstallment', 'repaid', 'balance', 'status'];
    

    return (
        <Grid container >
        <Table name='Loan History' 
        columns={columns} 
        lists={lists} 
        values={values} 
         />
        </Grid>
    )
}

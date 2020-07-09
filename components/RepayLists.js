import React from 'react'
import useAuth from '../context/authenticate';
import useLoans from '../context/loans';
import Spinner from './spinner';
import Router from "next/router";
import Table from './Table';
import {Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Alert from './Alert';

const useStyles= makeStyles(theme => ({
    center: {
        justifyContent: 'center'
    }
}))

function Repayments() {
    const {reset, partiallyPaid, loans} = useLoans()

    const [pLoans, setPLoans] = React.useState([]);

    const classes = useStyles();

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    React.useEffect(() => {
        const loadLoans = async() => {
            try {
                const loans = await partiallyPaid();
                setPLoans(loans);
            } catch (error) {
                setShow({
                    status: true,
                    message: `${'an error occured'}`,
                    severity: 'error'
                })
            }
            
        }
        loadLoans();
    }, [reset])

    const handleRepay = (each) => {
        Router.push(`/admin/repayment-history/${each.id}`)
    }

    const columns=  ['Email', 'Status', 'Tenor', 'Installment', 'Balance', 'Action']
    const lists= pLoans;
    const values= ['users', 'status', 'tenor', 'paymentinstallment', 'balance'];
    const actions= [
        {name:'repayment history', method: handleRepay, args: []},
    ]


    return (
        <Grid container >
        {show.status && <Alert show={show} remote={setShow}/>}
        <Table name='Active Loan Users' 
        columns={columns} 
        lists={lists} 
        values={values} 
        actions={actions} />
        </Grid>
    )
}

export default Repayments;

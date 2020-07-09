import React from 'react'
import useLoans from '../context/loans';
import { moneyConvert } from '../libs/utils';
import Table from './Table';
import {Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Router from "next/router";
import Alert from './Alert';

const useStyles= makeStyles(theme => ({
    center: {
        justifyContent: 'center'
    }
}))

function CurrentLoans() {
    const { partiallyPaid, reset,} = useLoans();

    const [loading, setLoading] = React.useState(false);

    const classes = useStyles();

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    const [loans, setLoans] = React.useState([]);

    React.useEffect(() => {
        const loadLoans = async() => {
            try {
                const loans = await partiallyPaid();
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

    const handleRepay = (each) => {
        Router.push(`/admin/client-repayment/${each.id}`)
    }

    const columns=  ['Email', 'Status', 'Tenor', 'Installment', 'Balance', 'Action']
    const lists= loans;
    const values= ['users', 'status', 'tenor', 'paymentinstallment', 'balance'];
    const actions= [
        {name:'make repayment', method: handleRepay, args: []},
    ]
    return (
        <Grid container >
        {show.status && <Alert show={show} remote={setShow}/>}
        <Table name='Current Active Loans' 
        columns={columns} 
        lists={lists} 
        values={values}
        actions={actions}
         />
        </Grid>
    )
}

export default CurrentLoans

import React from 'react'
import useLoans from '../context/loans';
import { moneyConvert } from '../libs/utils';
import Table from './Table';
import {Grid} from '@material-ui/core';
import Router from "next/router";
import Alert from './Alert';


function CurrentLoans({url='/admin/client-repayment', loans=[], remoteShow={}}) {

   const [show, setShow] = React.useState({})

   React.useEffect(() => {
        setShow(remoteShow)
   }, [remoteShow])

   const handleRepay = (each) => {
        Router.push(`${url}/${each.id}`)
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

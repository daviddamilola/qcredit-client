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

function LoanApplications() {

    const classes = useStyles();

    const { getPendingLoans, approveLoan, rejectLoan, reset, loans:myloans } = useLoans();

    const [loans, setLoans] = React.useState(myloans);

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    React.useEffect(() => {
        console.log('ran')
        const loadLoans = async() => {
            // const loans = await getPendingLoans();
             setLoans(myloans)
        }
        loadLoans();
    }, [reset, myloans])

    function approve(each, done, doneArg){
        approveLoan(each.id)
        .then((response) => {
            setShow({
                status: true,
                message: 'Loan has been approved',
                severity: 'success'
            })
        })
        .catch(err => {
            setShow({
                status: true,
                message: 'failed to approve loan application. Try again',
                severity: 'error'
            })
        })
        .finally(() => {
            done({
                [doneArg]: false
            })
        })
    }

    function reject(each, done, doneArg){
        rejectLoan(each.id)
        .then((response) => {
            setShow({
                status: true,
                message: 'Loan rejected',
                severity: 'success'
            })
        })
        .catch((err) => {
            setShow({
                status: true,
                message: 'Failed to reject loan',
                severity: 'error'
            })
        })
        .finally(() => {
            done({
                [doneArg]: false
            })
        })
    }

    const columns=  ['Email', 'Amount', 'Installment', 'Loan Tenor', 'Applied Date', 'Loan status', 'Approval']
    const lists= loans;
    const values= ['users', 'amount', 'paymentinstallment','tenor', 'createdAt','status'];
    const actions= [
        {name:'Approve', method: approve, args: []},
        {name:'Reject', method: reject, args: []}
    ]

    return (
        <Grid container >
        {show.status && <Alert show={show} remote={setShow}/>}
        <Table name='Loan Applications' 
        columns={columns} 
        lists={lists} 
        values={values} 
        actions={actions} />
        </Grid>
    )
}

export default LoanApplications

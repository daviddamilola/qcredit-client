import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from './Table';
import useLoans from '../context/loans';

const useStyles = makeStyles(theme => ({

}))

function RepayHistory({id}) {

    const { getRepayments, loans } = useLoans();

    const [repayments, setRepayments] = React.useState([]);

    const [specificLoan, setSpecificLoan] = React.useState({})

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    React.useEffect(() => {
        
        const loadRepayments = async () => {
            try {
                const res = await getRepayments(id);
                console.log(res)
                setRepayments(res)
                setSpecificLoan(loans.find(each => each.id == id))
            } catch (error) {
                if(error.status) console.log('error is', error);
                console.log(error)
                    // setShow({
                    //     status: true,
                    //     message: `${error.data.error}`,
                    //     severity: 'error'
                    // })
            }
        }
        loadRepayments();
    }, [id, loans])

        // const columns=  ['Email', 'Status', 'Tenor', 'Installment', 'Balance', 'Action']
        const lists= repayments;
    // const values= ['users', 'status', 'tenor', 'paymentinstallment', 'balance'];
    // const actions= [
    //     {name:'make repayment', method: handleRepay, args: []},
    // ]

    return (
        <Grid container>

        </Grid>
    )
}

export default RepayHistory

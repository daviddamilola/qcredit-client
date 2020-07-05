
import React, {useEffect} from 'react'
import useLoans from '../context/loans';

export default function History() {

    const [history, setHistory] = React.useState([]);
    const {loans} = useLoans();

    const moneyConvert = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    });

    useEffect(() => {
       setHistory(loans)
    }, [loans])

    return (
        <div class="container col row__Spread mt-4">
                    <div class="card col-12">
                        <div class="col col__Center cardBadge">
                            LOAN HISTORY
                        </div>
                        <table class="container col-11">
                            <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Tenor</th>
                                <th>Installment</th>
                                <th>Fully Paid</th>
                                <th>Balance</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {history.map(each => {
                                return(
                                    <tr>
                                        <td>{moneyConvert.format(each.amount)}</td>
                                        <td>{`${each.tenor} months`}</td>
                                        <td>{moneyConvert.format(each.paymentinstallment)}</td>
                                        <td>{`${each.repaid}`}</td>
                                        <td>{moneyConvert.format(each.balance)}</td>
                                        <td>{each.status}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div> 
    )
}

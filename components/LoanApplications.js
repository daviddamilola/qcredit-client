import React from 'react';
import useLoans from '../context/loans';
import { moneyConvert } from '../libs/utils'

function LoanApplications() {

    const { getPendingLoans, approveLoan, rejectLoan, reset, loans:myloans } = useLoans();

    const [loans, setLoans] = React.useState(myloans);

    React.useEffect(() => {
        console.log('ran')
        const loadLoans = async() => {
            // const loans = await getPendingLoans();
             setLoans(myloans)
        }
        loadLoans();
    }, [reset, myloans])

    function approve(id){
        approveLoan(id)
        .then()
        .catch()
        .finally()
    }

    function reject(id){
        rejectLoan(id)
        .then()
        .catch()
        .finally()
    }

    return (
        <div className="tabcontent" id="applications">
                        <div className="container card mt-4 mb-4" id="apply">
                            <div className="cardBadge col col__Center">
                                LOAN APPLICATIONS
                            </div>

                            <div className="container col-11 col col__Center  pb-2">
                                <table className=" pb-2">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Amount</th>
                                            <th>Installment</th>
                                            <th>Loan Tenor</th>
                                            <th>Applied Date</th>
                                            <th>Loan Status</th>
                                            <th>Amount To Pay</th>
                                            <th colSpan="2">Approval</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loans[0] && loans.map((each, i) => {
                                            return (<tr key={i}>
                                                <td>{each.users}</td>
                                            <td>{moneyConvert.format(each.amount)}</td>
                                                <td>{moneyConvert.format(each.paymentinstallment)}</td>
                                                <td>{each.tenor} months</td>
                                                <td>25/04/19</td>
                                                <td>{each.status}</td>
                                                <td>{moneyConvert.format(each.balance)}</td>
                                                <td><button onClick={() => approve(each.id)} className="approve"><img src="./img/approve.png" width="15px"
                                                                height="13px" alt=""/></button></td>
                                                <td><button onClick={() => reject(each.id)}  className="col col__Center reject"><img src="./img/reject.png"
                                                                width="15px" height="13px" alt=""/></button></td>
                                            </tr>)
                                        })}
                                    </tbody>
                                   
                                </table>
                            </div>

                        </div>
                    </div>
    )
}

export default LoanApplications

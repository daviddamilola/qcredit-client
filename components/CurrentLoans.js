import React from 'react'
import useLoans from '../context/loans';
import { moneyConvert } from '../libs/utils'

function CurrentLoans() {
    const { partiallyPaid, reset,} = useLoans();

    const [loans, setLoans] = React.useState([]);

    React.useEffect(() => {
        console.log('ran')
        const loadLoans = async() => {
            const loans = await partiallyPaid();
            if(!loans.status) setLoans(loans);
        }
        loadLoans();
    }, [reset])
    return (
        <div className="tabcontent" id="currentloan">
                        <div className="container card mt-4">
                            <div className="cardBadge col col__Center">
                                CURRENT LOAN APPLICATIONS(
                                Half Paid)
                            </div>
                            <div className="pb-2">
                            <table className="container  col-11 ">
                            <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Tenor</th>
                                            <th>Installment</th>
                                            <th>Balance</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {loans.map((each, i) => <tr key={i}>
                                            <td>{`${each.users}`}</td>
                                            <td>{each.status}</td>
                                            <td>{each.tenor}</td>
                                            <td>{each.paymentinstallment}</td>
                                            <td>{each.balance}</td>
                                            <td>
                                                <div className="row col col__Center padding-s">
                                                    <button onClick={() => handleRepay(each.id)} className="tdBtn ml-1">{'Make Repayment'}</button>
                                                </div>
                                            </td>
                                        </tr>
                                        )}
                                        </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
    )
}

export default CurrentLoans

import React from 'react'
import useAuth from '../context/authenticate';
import useLoans from '../context/loans';
import Spinner from './spinner';
import Router from "next/router";

function Repayments() {
    const {reset, partiallyPaid, loans} = useLoans()

    const [pLoans, setPLoans] = React.useState([]);

    React.useEffect(() => {
        const loadLoans = async() => {
            const loans = await partiallyPaid();
            console.log('repayments', loans)
            if(!loans.status) setPLoans(loans);
        }
        loadLoans();
    }, [reset])

    const handleRepay = (id) => {
        Router.push(`/admin/client-repayment/${id}`)
    }


    return (
        <div className="tabcontent" id="verify">
                        <div className="container col-11">
                            <div className="card mt-4">
                                <div className="cardBadge col col__Center">
                                    REPAYMENTS
                                </div>
                                <div className="padding">
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
                                        {pLoans.map((each, i) => <tr key={i}>
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
                    </div>
    )
}

export default Repayments;

import React from 'react'
import useAuth from '../context/authenticate';
import Spinner from './spinner';

function Verify() {
    const { users, verify, unVerify, reset} = useAuth();

    const [lUsers, setLusers] = React.useState([]);

    const [loading, setLoading] = React.useState({})

    const [unLoading, setUnLoading] = React.useState({})

    React.useEffect(() => {
        setLusers(users)
    }, [users, reset])

    const handleVerify = (email) => {
        setLoading({
            [email]: true
        })
        verify(email)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err.response)
        })
        .finally(() => {
            setLoading({
                [email]: false
            })
        })
    }

    const handleUnVerify = (email) => {
        setUnLoading({
            [email]: true
        })
        unVerify(email)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err.response)
        })
        .finally(() => {
            setUnLoading(false)
        })
    }


    return (
        <div className="tabcontent" id="verify">
                        <div className="container col-11">
                            <div className="card mt-4">
                                <div className="cardBadge col col__Center">
                                    VERIFY CLIENTS
                                </div>
                                <div className="padding">
                                    <table className="container  col-11 ">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Phone Number</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {lUsers.map((each, i) => <tr key={i}>
                                            <td>{`${each.firstname} ${each.lastname}`}</td>
                                            <td>{each.email}</td>
                                            <td>{each.address}</td>
                                            <td>{each.phonenumber}</td>
                                            <td>{each.status}</td>
                                            <td>
                                                <div className="row col col__Center padding-s">
                                                    <button onClick={() => handleVerify(each.email)} className="tdBtn ml-1">{loading[each.email]? <Spinner />: 'Verify'}</button>
                                                    <button onClick={() => handleUnVerify(each.email)} className="tdBtn ml-1">{unLoading[each.email]? <Spinner />: 'Unverify'}</button>
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

export default Verify

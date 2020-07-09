import React from 'react'
import useAuth from '../context/authenticate';
import Spinner from './spinner';
import Table from './Table';
import {Grid} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Alert from './Alert';

const useStyles= makeStyles(theme => ({
    center: {
        justifyContent: 'center'
    }
}))

function Verify() {
    const { users, verify, unVerify, reset} = useAuth();

    const classes = useStyles();

    const [lUsers, setLusers] = React.useState([]);

    const [loading, setLoading] = React.useState({})

    const [unLoading, setUnLoading] = React.useState({})

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    React.useEffect(() => {
        setLusers(users)
    }, [users, reset])

    const handleVerify = (each, done, doenArg) => {
        verify(each.email)
        .then((response) => {
            setShow({
                status: true,
                message: 'successful',
                severity: 'success'
            })
        })
        .catch((err) => {
            setShow({
                status: true,
                message: `${err.message}`,
                severity: 'error'
            })
        })
        .finally(() => {
            done(false)
        })
    }

    const handleUnVerify = (each, done, doenArg) => {
        unVerify(each.email)
        .then((response) => {
            console.log(response)
            setShow({
                status: true,
                message: 'successful',
                severity: 'success'
            })
        })
        .catch((err) => {
            setShow({
                status: true,
                message: `${err.message}`,
                severity: 'error'
            })
        })
        .finally(() => {
            done({
                [doenArg]: false
            })
        })
    }

    const columns=  ['Name', 'Email', 'Address', 'Phone Number', 'Status', 'Action']
    const lists= lUsers;
    const values= ['firstname', 'email', 'address', 'phonenumber', 'status'];
    const actions= [
        {name:'verify', method: handleVerify, args: []},
        {name:'unverify', method: handleUnVerify, args: []}
    ]

    return (
        <Grid container >
        {show.status && <Alert show={show} remote={setShow}/>}
        <Table name='Verify Users' 
        columns={columns} 
        lists={lists} 
        values={values} 
        actions={actions} />
        </Grid>
    )
}

export default Verify

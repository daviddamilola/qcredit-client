import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api';
import authGetter from '../libs/auth';
import Router from 'next/router';

const LoansContext = createContext({});

export const LoansProvider = ({children}) => {

    const [loans, setLoans] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [reset, setReset] = useState(1)


    useEffect(() => {
        async function loadLoans() {
            const token = authGetter()?.token;
            if (token) {
                //get token from local storage and see if its valid
                api.defaults.headers.Authorization = token
                try {
                    const { data: data} = await api.get('loans')
                    if (data) setLoans(data.data);
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    // not authorized or some network or technical error
                }
            }
        }
        loadLoans();
    }, [reset])

    const getPendingLoans = async () => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                setLoading(false)
                const { data: data} = await api.get('loans?status=pending')
                if (data) return(data.data);
            } catch (error) {
                return error.response
            }
        }
    }

    const approveLoan = async (id) => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                setLoading(false)
                const { data: data} = await api.patch(`loans/${id}`, {status: 'approve'})
                setReset(prev => prev+1)
                if (data) return(data.data);
                
            } catch (error) {
                return error.response
            }
        }
    }

    const rejectLoan = async (id) => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                setLoading(false)
                const { data: data} = await api.patch(`loans/${id}`, {status: 'reject'})
                setReset(prev => prev+1)
                if (data) return(data.data);
                
            } catch (error) {
                return error.response
            }
        }
    }

    const partiallyPaid = async() => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                const { data: data} = await api.get(`loans?repaid=false&status=approved`)
                if (data) return(data.data);
                setLoading(false)
            } catch (error) {
                return error.response
            }
        }
    }

    const fullyPaid = async () => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                const { data:{data}} = await api.get(`loans?repaid=true&status=approved`)
                setLoading(false)
                if (data) return(data);
            } catch (error) {
                return error.response
            }
        }
    }

    const makeRepayment = async (amountData, id) => {
            try{
                console.log('data is ', amountData)
                const response = await api.post(`loans/${id}`, amountData);
                const { data:{data}} = response;
                console.log(response)
                setLoading(false);
                if (data) return(data);
            } catch(err) {
                if(err.response)return err.response;
                return err
            }
           
    }

    return (
        <LoansContext.Provider value={{loans, loading, getPendingLoans, approveLoan, rejectLoan, partiallyPaid, fullyPaid, makeRepayment}}>
            {children}
        </LoansContext.Provider>
    )
}

export default function useLoans() {
    const context = useContext(LoansContext);
    console.log(context)
    return context;
}
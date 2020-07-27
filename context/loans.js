import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api';
import authGetter from '../libs/auth';
import Router from 'next/router';
import axios from 'axios';



const LoansContext = createContext({});

export const LoansProvider = ({ children }) => {

    const [loans, setLoans] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [reset, setReset] = useState(1)

    

    useEffect(() => {
        let CancelToken = axios.CancelToken.source();
        async function loadLoans() {
            const token = authGetter()?.token;
            if (token) {
                api.defaults.headers.Authorization = token
                try {
                    const { data: data } = await api.get('loans', {
                        cancelToken: CancelToken.token,
                    })
                    if (data) setLoans(data.data);
                    setLoading(false)
                } catch (error) {
                    if(axios.isCancel(error)){
                        console.log('request canceled');
                        return
                    }
                    console.log(error)
                    setLoading(false)
                }
            }
        };  
        loadLoans();
        return function cleanUp() {
            CancelToken.cancel('loan request canceled');
        }
    }, [])

    const getPendingLoans = async () => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                setLoading(false)
                const { data: data } = await api.get('loans?status=pending')
                if (data) return (data.data);
            } catch (error) {
                if (!error.response) {
                    throw ({
                        status: '400',
                        message: error.toString(),
                    })
                }
                throw (error.response)
            }
        }
    }

    const approveLoan = async (id) => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                setLoading(false)
                const { data: data } = await api.patch(`loans/${id}`, { status: 'approve' })
                setReset(prev => prev + 1)
                if (data) return (data.data);

            } catch (error) {
                if (!error.response) {
                    throw ({
                        status: '400',
                        message: error.toString(),
                    })
                }
                throw (error.response)
            }
        }
    }

    const rejectLoan = async (id) => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                setLoading(false)
                const { data: data } = await api.patch(`loans/${id}`, { status: 'reject' })
                setReset(prev => prev + 1)
                if (data) return (data.data);

            } catch (error) {
                if (!error.response) {
                    throw ({
                        status: '400',
                        message: error.toString(),
                    })
                }
                throw (error.response)
            }
        }
    }

    const partiallyPaid = async () => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                const { data: data } = await api.get(`loans?repaid=false&status=approved`)
                if (data) return (data.data);
                setLoading(false)
            } catch (error) {
                if (!error.response) {
                    throw ({
                        status: '400',
                        message: error.toString(),
                    })
                }
                throw (error.response)
            }
        }
    }

    const fullyPaid = async () => {
        const token = authGetter()?.token;
        if (token) {
            api.defaults.headers.Authorization = token
            try {
                const { data: { data } } = await api.get(`loans?repaid=true&status=approved`)
                setLoading(false)
                if (data) return (data);
            } catch (error) {
                if (!error.response) {
                    throw ({
                        status: '400',
                        message: error.toString(),
                    })
                }
                throw (error.response)
            }
        }
    }

    const makeRepayment = async (amountData, id) => {
        try {
            console.log('data is ', amountData)
            const response = await api.post(`loans/${id}`, amountData);
            const { data: { data } } = response;
            console.log(response)
            setLoading(false);
            if (data) return (data);
        } catch (err) {
            if (!error.response) {
                throw ({
                    status: '400',
                    message: error.toString(),
                })
            }
            throw (error.response)
        }

    }

    const getRepayments = async (id) => {
        try {
            const response = await api.get(`loans/${id}/repayments`)
            const { data: { data } } = response;
            console.log(response)
            setLoading(false);
            if (data) return (data);
        } catch (error) {
            if (!error.response) {
                throw ({
                    status: '400',
                    message: error.toString(),
                })
            }
            throw (error.response)
        }
    }

    return (
        <LoansContext.Provider value={{ loans, loading, getPendingLoans, approveLoan, rejectLoan, partiallyPaid, fullyPaid, makeRepayment, getRepayments }}>
            {children}
        </LoansContext.Provider>
    )
}

export default function useLoans() {
    const context = useContext(LoansContext);
    return context;
}
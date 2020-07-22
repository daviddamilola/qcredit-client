import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api';
import authGetter from '../libs/auth';
import Router from 'next/router';
import axios from 'axios';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [reset, setReset] = useState(1)

  

    useEffect(() => {
        let CancelToken = axios.CancelToken.source();
        
        Router.prefetch('/signin');

        async function loadUserFromStorage() {
            const token = authGetter()?.token;
            if (token !== 'null') {
                //get token from local storage and see if its valid
                api.defaults.headers.Authorization = token
                try {
                    const { data: {data}} = await api.get('user',{
                        cancelToken: CancelToken.token,
                    })

                    const {data: {data: users}} = await api.get('users')
                    if (data) setUser(data);
                    if (users) setUsers(users)
                    setLoading(false)
                } catch (error) {
                    if(axios.isCancel(error)){
                        console.log('request canceled');
                    }
                    setLoading(false)
                    // not authorized or some network or technical error
                }
            }
        }
        loadUserFromStorage()
        return () => {
           CancelToken.cancel('loan request canceled');
        }
    }, [])

    const login = async (data) => {
        try{
            const response = await api.post('auth/signin', data)
            const authToken = response.data.data.token;
            if (authToken) {
                api.defaults.headers.Authorization = `${authToken}`
                const { data } = await api.get('user')
                setUser(data.data)
            }
            return Promise.resolve(response)
        } catch(err){
            return Promise.reject(err)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.setItem('auth', null)
        localStorage.setItem('privi', null)
        Router.push('/signin')
    }

    const signUp = async (data) => {
        const lData = data;
        try{
            const response = await api.post('auth/signup', lData)
            const authToken = response.data.data.token;
            localStorage.setItem('auth', authToken)
            
                api.defaults.headers.Authorization = `${authToken}`
                const { data: { data }} = await api.get('user')
                setUser(data)
            return Promise.resolve(response)
        } catch(err){
            return Promise.reject(err)
        }
    }

    const verify = async (email) => {
        try {
            const response = await api.patch(`users/${email}/verify`)
            setReset(prev => prev+1)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const unVerify = async (email) => {
        try {
            const response = await api.patch(`users/${email}/unverify`)
            setReset(prev => prev+1)
            return Promise.resolve(response)
        } catch (error) {
            return Promise.reject(error)
        }
    }


    return (
        <AuthContext.Provider value={{ 
                isAuthenticated: !!user,
                signUp,
                user,
                users,
                setUser,
                login,
                loading,
                logout,
                verify,
                unVerify,
                reset
            }}>
            {children}
        </AuthContext.Provider>
    )
}



export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};
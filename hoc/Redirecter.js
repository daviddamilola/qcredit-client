import React, {useEffect} from 'react';
import useAuth from '../context/authenticate';
import { useRouter } from 'next/router';
import authGetter from '../libs/auth';
import Router from 'next/router';

export function Redirecter(Component) {
    return () => {
        // const { isAuthenticated, loading, user} = useAuth();
        // const Router = useRouter();
        const details = authGetter();

        useEffect(() => {
            if (details.token == 'null' || !details.token) return Router.push('/signin');
            if(details.privi == 2) {
                return Router.push('/admin')
            }else{
                return Router.push('/apply')
            }
        }, [])

        return (<Component {...arguments} />)
    }
}
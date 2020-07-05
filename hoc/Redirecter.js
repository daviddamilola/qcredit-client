import React, {useEffect} from 'react';
import useAuth from '../context/authenticate';
import { useRouter } from 'next/router';

export function Redirecter(Component) {
    return () => {
        const { isAuthenticated, loading, user} = useAuth();
        const Router = useRouter();

        useEffect(() => {
            if (!isAuthenticated && !loading) return Router.push('/login');
            if(user.isadmin) {
                return Router.push('/admin')
            }else{
                return Router.push('/apply')
            }
        }, [loading, isAuthenticated])

        return (<Component {...arguments} />)
    }
}
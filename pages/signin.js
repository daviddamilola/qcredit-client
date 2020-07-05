import React, {useRef, useState} from 'react';
import Layout from '../components/Layout';
import Spinner from '../components/spinner';
import useValidation from '../libs/useValidation';
import api from '../services/api';
import Router from 'next/router';
import useAuth from '../context/authenticate';
import Toast from '../components/Toast';

export default function SignIn() {

    React.useEffect(() => {
        Router.prefetch('/admin')
        Router.prefetch('/apply')
    })

    const { user, login} = useAuth();

    const formRef = useRef(null);

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        rememberMe: '',
      });

    const [loading, setLoading] = useState(false)
    
    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(inputs).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
        process.nextTick(() => {
            if(Object.values(formIsValid).every(each => each)){
                setLoading(true)
                login(inputs)
                    .then((response)=> {
                        console.log(response)
                        const {data: {data: {token, privi}}} = response;
                        localStorage.setItem('auth', token)
                        localStorage.setItem('privi', privi)
                        if(user.isadmin) {
                            return Router.push('/admin')
                        }else{
                            return Router.push('/apply')
                        }
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        })
    }

    const handleChange= (e) => {
        if(e.target.name === 'rememberMe') {
            return setInputs(prev=> ({
                ...prev,
                rememberMe: !prev.rememberMe,
            }))
        }
        setInputs({...inputs,
        [e.target.name]: e.target.value})
    }
    const [show, setShow] = React.useState(true)

    const trigger = (fn) => fn 

    return(
        <>
                <Layout>
                    <Toast left='0%' content="success" variant="danger" time={7000} show={show} trigger={trigger}/>
                <div className=" col col__Center form">
                    <div className=" col-5">
                        <form onSubmit={handleSubmit} ref={formRef} method="post" className="container validate">
                            <fieldset>
                                <legend className="legend"> Sign In </legend>
                                <div>
                                    <input onChange={handleChange} type="email" id="email" name='email' placeholder="email" value={inputs.email} required/>
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="password" id="passwd" name='password' value={inputs.password} placeholder="Password*"  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                                        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                        onChange={handleChange}
                                        required/>
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input onChange={handleChange} type="checkbox" name='rememberMe' id="remember" checked={inputs.rememberMe}/> Remember me
                                    <span className="error"></span>
                                </div>
                                    <a href="/apply"><button className="btn col-12" type="submit">{loading? <Spinner />: 'Submit Now'}</button></a>
                                <p>dont have an account ? <a href="/signup">Sign Up</a></p>
                            </fieldset>

                        </form>
                    </div>
                </div>
                </Layout>
        </>
    )
}



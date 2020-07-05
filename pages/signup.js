import React, {useRef, useState} from 'react';
import Layout from '../components/Layout';
import useValidation from '../libs/useValidation';
import useAuth from '../context/authenticate';
import Spinner from '../components/spinner';
import api from '../services/api';
import Router from 'next/router';

export default function SignUp(){

    const formRef = useRef(null);

    const { user, signUp} = useAuth();

    const [loading, setLoading] = useState(false)

    const [inputs, setInputs] = useState({
        email: '',
        firstName: '',
        phonenumber: '',
        lastName: '',
        password:'',
        address: '',
        cfpassword:'',
        termsOfService:'',
      });
    
    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(inputs).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
                console.log(Array.from(formRef.current.querySelectorAll('input')))
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
          process.nextTick(() => {
            if(Object.values(formIsValid).every(each => each)){
                setLoading(true)
                signUp(inputs)
                    .then((response)=> {
                        console.log(response)
                        const token = response.data.data.token;
                        localStorage.setItem('auth', token)
                        
                        if(user.isadmin) {
                            localStorage.setItem('privi', 1)
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
        if(e.target.name === 'termsOfService') {
            return setInputs(prev=> ({
                ...prev,
                termsOfService: !prev.termsOfService,
            }))
        }
        setInputs({...inputs,
        [e.target.name]: e.target.value})
    }

    return(
        <>
            <Layout>
                <div className=" col col__Center form">
                    <div className=" col-5">
                        <form ref={formRef} onSubmit={handleSubmit} method="post" className="container validate">
                            <fieldset>
                                <legend className="legend"> Sign Up </legend>
                                <div>
                                    <input type="email" name="email" onChange={handleChange} value={inputs.email} placeholder="Email*" pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$"
                                        required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="text" name="firstName" onChange={handleChange} value={inputs.firstname} placeholder="first name*" required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="text" name="lastName" onChange={handleChange} value={inputs.lastname} placeholder="last name*" required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="text" name="phonenumber" onChange={handleChange} value={inputs.phonenumber} placeholder="Phone" required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="text" name="address" onChange={handleChange} value={inputs.address} placeholder="Address" required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="password" name="password" onChange={handleChange} value={inputs.password} placeholder="Password*" minlength="8" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                                        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                        required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="password" name="cfpassword" onChange={handleChange} value={inputs.cfpassword} placeholder="Confirm Password*" minlength="8" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                                        title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                                        required />
                                    <span className="error"></span>
                                </div>
                                <div>
                                    <input type="checkbox" name="termsOfService" onChange={handleChange} value={inputs.termsOfService} required/> i accept <a href="/termsofservice.html">terms
                                        of service*</a>
                                    <span className="error"></span>
                                </div>
                                <button className="btn col-12" type="submit">{loading? <Spinner />: 'Submit Now'}</button>
                                <p>Already have an account?<a href="/signin">Log In</a></p>
                            </fieldset>

                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}


   
import React, {useRef, useState} from 'react';
import useValidation from '../libs/useValidation';
import api from '../services/api';
import Spinner from './spinner';
import authGetter from '../libs/auth';

export default function Apply(){
    const formRef = useRef(null);

    const [loading, setLoading] = React.useState(false);

    const [apply, setApply] = useState({
        amount: '',
        tenor: '',
      });

    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.keys(apply).forEach(input => {
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
            api.defaults.headers.Authorization = authGetter()?.token;
            api.post('/loans', apply)
              .then(response => {
                console.log(Response)
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
        setApply({...apply,
        [e.target.name]: e.target.value})
    }

    return(
        <>
             <div className="container row">
            <div className="container card mt-4">
              <div className="cardBadge col col__Center">
                APPLY FOR LOAN
              </div>
              <div className="cardBody pb-2">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="container col-10 applyForm row row__spread">
                    <div className="container col-6 col col___Center">
                      <div className="inputGrp">
                        <label htmlFor="tenor">Tenor <span className="required">*</span></label>
                        <input type="number" min="1" max="12" step="1" name="tenor" onChange={handleChange} value={apply.tenor} id="tenor" placeholder="tenor"
                          required/>
                      </div>
                      <div className="inputGrp mb-2">
                        <label htmlFor="amount">Amount<span className="required">*</span></label>
                        <input type="number" name="amount" onChange={handleChange} value={apply.amount} min="1000" max="100000" step="1000" id="amount" placeholder="how much ?"
                          required/>
                      </div>
                      <div className="col-12 col col__Center">
                        <button type="submit" className="btn">{loading? <Spinner /> : 'Apply For A Loan'}</button>
                      </div>
  
                    </div>
  
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </>
    )
}
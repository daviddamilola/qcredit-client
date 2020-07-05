import React, {useRef, useState} from 'react';
import useValidation from '../libs/useValidation';
import useLoans from '../context/loans';

export default function Repay({id}){
    const formRef = useRef(null);

    const {makeRepayment} = useLoans();

    const [loading, setLoading] =  React.useState(false)

    const [client, setClient] = useState({
        amountPaid: ''
      });

    const { validate, state:{ errors, showError, formIsValid} } = useValidation(formRef);

    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(client).forEach(input => {
            if (!(input in formIsValid && formIsValid[input])) {
              const field = Array.from(formRef.current.querySelectorAll('input')).find(
                x => x.name === input
              );
              validate(field);
            }
          });
          process.nextTick(async () => {
            if(Object.values(formIsValid).every(each => each)){
              setLoading(true)
              try {
                  const response = await makeRepayment(client, id);
                  if(response.status === 400 )throw (response);
              } catch (error) {
                  console.log(error)
              }
            }
          })
    }

    const handleChange= (e) => {
        setClient({...client,
        [e.target.name]: e.target.value})
    }

    return(
        <>
            <div className="tabcontent" id="repay4client">
                        <div className="container card mt-4">
                            <div className="cardBadge col col__Center">
                                CLIENT LOAN REPAYMENT
                            </div>
                            <div className="cardBody pb-2">
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <div className="container col-10 applyForm row row__spread">
                                        <div className="container col-6 col col___Center">
                                            <div className="inputGrp">
                                                <label htmlFor="amountPaid">Amount<span className="required">*</span></label>
                                                <input type="number" onChange={handleChange} value={client.amountPaid} name="amountPaid" id="amount" placeholder="enter amount"
                                                    required/>
                                            </div>
                                            
                                            <div className="col-12 col col__Center">
                                                <button type="submit" className="btn">Make Payment</button>
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
import React from 'react';
import ApplyMain from '../components/ApplyMain';
import Overview from '../components/Overview';

function Welcome() {
    return(
        <>
                <ApplyMain>
                    <Overview 
                        repaid={400000} 
                        approved={600000}
                        pending={0}
                        applications={1}
                        repayments={3}
                         />
                </ApplyMain>
  
        </>
    )
}

export default Welcome
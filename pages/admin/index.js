import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import Overview from '../../components/Overview';
import {Redirecter} from '../../hoc/Redirecter';

function Admin() {
    return(
        <>
                <MainAdmin>
                    <Overview 
                        repaid={400000} 
                        approved={600000}
                        pending={0}
                        applications={1}
                        repayments={3}
                         />
                </MainAdmin>
  
        </>
    )
}

export default Redirecter(Admin)
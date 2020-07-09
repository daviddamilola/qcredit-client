import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import Overview from '../../components/Overview';
import {Redirecter} from '../../hoc/Redirecter';

function Admin() {
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <Overview />
                </MainAdmin>
            </SideProvider>
        </>
    )
}

export default Redirecter(Admin)
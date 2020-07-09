import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import LoanApplications from '../../components/LoanApplications';

export default function Admin() {
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <LoanApplications />
                </MainAdmin>
            </SideProvider>
        </>
    )
}
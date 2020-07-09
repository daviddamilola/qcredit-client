import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import CurrentLoans from '../../components/CurrentLoans';

export default function Admin() {
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <CurrentLoans />
                </MainAdmin>
            </SideProvider>
        </>
    )
}
import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import RepaidLoans from '../../components/RepaidLoans';

export default function Admin() {
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <RepaidLoans />
                </MainAdmin>
            </SideProvider>
        </>
    )
}
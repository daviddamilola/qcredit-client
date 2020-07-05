import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import Overview from '../../components/Overview';

export default function Admin() {
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
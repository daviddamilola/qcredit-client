import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import Verify from '../../components/Verify';

export default function Admin() {
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <Verify />
                </MainAdmin>
            </SideProvider>
        </>
    )
}
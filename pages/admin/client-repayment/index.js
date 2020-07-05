import React from 'react';
import MainAdmin from '../../../components/admin';
import {SideProvider} from '../../../components/Drawer';
import RepayLists from '../../../components/RepayLists';

export default function Admin() {
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <RepayLists />
                </MainAdmin>
            </SideProvider>
        </>
    )
}
import React from 'react';
import ApplyMain from '../components/ApplyMain';
import {SideProvider} from '../components/Drawer';
import {LoansProvider} from '../context/loans';

export default function Admin() {
    return(
        <>
            <SideProvider>
                <LoansProvider>
                    <ApplyMain />
                </LoansProvider>
            </SideProvider>
        </>
    )
}
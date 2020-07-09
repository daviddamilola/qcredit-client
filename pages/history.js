import React from 'react';
import ApplyMain from '../components/ApplyMain';
import {SideProvider} from '../components/Drawer';
import {LoansProvider} from '../context/loans';
import History from '../components/History';

export default function Index() {
    return(
        <>
            <SideProvider>
                <LoansProvider>
                    <ApplyMain>
                        <History />
                    </ApplyMain>
                </LoansProvider>
            </SideProvider>
        </>
    )
}
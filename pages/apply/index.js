import React from 'react';
import ApplyMain from '../../components/ApplyMain';
import {SideProvider} from '../../components/Drawer';
import {LoansProvider} from '../../context/loans';
import Apply from '../../components/Apply';

export default function Index() {
    return(
        <>
            <SideProvider>
                <LoansProvider>
                    <ApplyMain>
                        <Apply />
                    </ApplyMain>
                </LoansProvider>
            </SideProvider>
        </>
    )
}
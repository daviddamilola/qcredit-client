import React from 'react';
import ApplyMain from '../../components/ApplyMain';
import {SideProvider} from '../../components/Drawer';
import Repay from '../../components/Repay';
import { useRouter } from 'next/router'

export default function Repayment() {

    const router = useRouter()
    const { id } = router.query;

    return(
        <>
            <SideProvider>
                <ApplyMain>
                    <Repay id={id}/>
                </ApplyMain>
            </SideProvider>
        </>
    )
}
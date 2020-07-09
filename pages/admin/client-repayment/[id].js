import React from 'react';
import MainAdmin from '../../../components/admin';
import {SideProvider} from '../../../components/Drawer';
import Repay from '../../../components/Repay';
import { useRouter } from 'next/router'

export default function Admin() {

    const router = useRouter()
    const { id } = router.query;

    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <Repay id={id}/>
                </MainAdmin>
            </SideProvider>
        </>
    )
}
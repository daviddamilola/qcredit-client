import React from 'react';
import MainAdmin from '../../../components/admin';
import {SideProvider} from '../../../components/Drawer';
import RepayHistory from '../../../components/RepayHistory';
import { useRouter } from 'next/router'

export default function Admin() {

    const router = useRouter()
    const { id } = router.query;

    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <RepayHistory id={id}/>
                </MainAdmin>
            </SideProvider>
        </>
    )
}
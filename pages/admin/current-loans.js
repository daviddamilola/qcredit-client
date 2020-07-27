import React from 'react';
import MainAdmin from '../../components/admin';
import {SideProvider} from '../../components/Drawer';
import CurrentLoans from '../../components/CurrentLoans';

export default function Admin() {
	 const { partiallyPaid, reset,} = useLoans();

	const [loading, setLoading] = React.useState(false);

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    const [loans, setLoans] = React.useState([]);

    React.useEffect(() => {
        const loadLoans = async() => {
            try {
                const loans = await partiallyPaid();
                setLoans(loans);
            } catch (error) {
                if(error.status) console.log('error is', error);
                setShow({
                    status: true,
                    message: `${error.data.error}`,
                    severity: 'error'
                })
            }
        }
        loadLoans();
    }, [reset])
    return(
        <>
            <SideProvider>
                <MainAdmin>
                    <CurrentLoans loans={loans} remoteShow={show} />
                </MainAdmin>
            </SideProvider>
        </>
    )
}
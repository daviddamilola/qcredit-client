import React from 'react';
import ApplyMain from '../../components/ApplyMain';
import {SideProvider} from '../../components/Drawer';
import CurrentLoans from '../../components/CurrentLoans';
import useLoans from '../../context/loans'

export default function Repay() {

	const [loading, setLoading] = React.useState(false);

	const {loans:contextLoan} = useLoans();

    const [show, setShow] = React.useState({
        status: false,
        message: '',
        severity:''
      })

    const [loans, setLoans] = React.useState([]);

    React.useEffect(() => {
        setLoans(contextLoan)
    }, [contextLoan])
    return(
        <>
            <SideProvider>
                <ApplyMain>
                    <CurrentLoans url='/active-loans' loans={loans}  remoteShow={show}/>
                </ApplyMain>
            </SideProvider>
        </>
    )
}
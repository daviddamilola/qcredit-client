import React, {useRef, useState, useEffect} from 'react';
import useValidation from '../libs/useValidation';
import Repay from './Repay';
import SmHeader, {sideProvider, useSideProvider} from './Drawer';
import Verify from './Verify';
import LoanApplications from './LoanApplications';
import CurrentLoans from './CurrentLoans';
import { LoanProvider, LoansProvider } from '../context/loans';
import RepaidLoans from './RepaidLoans';
import Overview from './Overview';
import Link from 'next/link'


function Dashboard({children}){

    const [sections, setSections] = React.useState({
        overview :true
    })

    const {show, setShow} = useSideProvider();

    const handleClose = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    const mLinks = [
        {name:'Home', route: '/', icon: ''},
        {name:'Verify Clients', route: '/verify', icon: ''},
        {name:'Current Loans', route: '/current-loans', icon: ''},
        {name:'Loan Applications', route: '/loan-applications', icon: ''},
        {name:'Repaid Loans', route: '/repaid-loans', icon: ''},
        {name:'Repayments', route: '/client-repayment', icon: ''},
    ]



    return (
        <>
            <LoansProvider>
             <div className=" col-12 row row__Spread">
            <aside className="sidebar col-2">
            <div className="logo row col__Center">
                <a href="./index">
                    <h1>QuickCredit</h1>
                </a>
            </div>
            <hr className=""/>
            <div className="sideNav col row__spread col__Center">
                <div>
                    <ul className="tab">
                        {mLinks.map(each => (
                            <li className="sideNavItem ">
                                <Link href={`/admin${each.route}`} className=" tablinks" prefetch>
                                    <a>{each.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul className="">
                        <li className="sideNavItem ">
                            <button className=" tablinks">
                                <a href="/signin">Log Out</a>
                            </button>

                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <section className="container col-9 col-s-11 mainDashboard">
            <div className="row row__spread container mainDashboard__header">
                <div className="dhead col-3 col-s-4 row">
                    <p>Dashboard | welcome Admin</p>
                </div>
                <div className="row dashNprofile col-8">
                    <div className="row  ">

                        <form className=" row col__center search dashNav" id="navSearch">
                            <input type="search" name="search" id="search" placeholder="Search" className="col-11"/>
                            <button type="submit" className="col-1 ">
                                <img src='./img/magnifying.png' />
                            </button>
                        </form>
                        <div className="col-s-2">
                            <div className="user circle "></div>
                        </div>

                    </div>
                </div>
            </div>
           <SmHeader />
           {
               show && <div id="mySidenav" className="sidenav paddinglr">
               <a href='' onClick={handleClose} className="closebtn">&times;</a>
               <ul>
               {mLinks.map(each => (
                            <li className="sideNavItem ">
                                <Link href={`/admin${each.route}`} className=" tablinks" prefetch>
                                    <a>{each.name}</a>
                                </Link>
                            </li>
                        ))}
                   <li className="sideNavItem">
                       <button className=" tablinks">
                           <a href="/apply">Apply For A Loan</a>
                       </button>
                   </li>
               </ul>
           </div>
           }
            
            <hr className="col-s-12"/>
            <div id="canvas">
                <div className="col-12">
                    {children}
                </div>
            </div>
            </section>
        </div>
        </LoansProvider>
         </>
    )
}


export default Dashboard;
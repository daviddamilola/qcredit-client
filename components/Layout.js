import React from 'react';
import SmHeader, { useSideProvider} from './Drawer';


export default function Layout({children}){
        const {show, setShow} = useSideProvider();

    const toggleShow = (e) => {
        e.preventDefault()
        setShow(!show)
    }
    return(
        <>
        <div className="formBg">

        <div className="container logoArea row row__spread">
            <div className="logo">
                <h1>QuickCredit</h1>
            </div>
            <div className="stats row col__Center ">
                <div className="apply">
                    <button className="btn access"><a href="/apply">Apply For A Loan</a></button>
                </div>
            </div>
            {
                    show && <div id="mySidenav" className="sidenav paddinglr">
                        <a href="" onClick={toggleShow} className="closebtn">&times;</a>
                        <ul>
                            <li className="sideNavItem ">
                                <a href="/apply" id="apply4loan">Apply For Loan</a>
                            </li>
                            <li className="sideNavItem ">
                                <a href="/#services">services</a>
                            </li>
                            <li className="sideNavItem ">
                                <a href="/#provide">We Provide</a>
                            </li>
                            <li className="sideNavItem links"><a href="/apply"><button className="btn"> Apply For A Loan</button></a></li>
                        </ul>
                    </div>
                }
            <div className="navBtn" onClick={toggleShow}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
        <nav className=" container nav row row__spread col-11">
            <div className=" col-6 col col__Center navLinks">
                <ul className="row  container">
                    <li className="links ml-1"><a href="/">Home</a></li>
                    <li className="links ml-1"><a href="/#services">Service</a></li>
                    <li className="links  ml-1"><a href="/#provide">We Provide</a></li>
                    <li className="links  ml-1"><a href="/apply">Apply For A Loan</a></li>
                </ul>
            </div>
            <form className="col-4 row col__center search">
                <input type="search" name="search" id="search" placeholder="Search" className="col-11"/>
                <button type="submit" className="col-1 ">
                    <img src='./img/magnifying.png' />
                </button>
            </form>
        </nav>
        {children}
        </div>
        </>
    )
}
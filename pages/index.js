import React from 'react';
import SmHeader, { useSideProvider} from '../components/Drawer';


export default function Home() {

    const {show, setShow} = useSideProvider();

    const toggleShow = (e) => {
        e.preventDefault()
        setShow(!show)
    }


    return (
        <>
            <div id="landingPage">
                <div className="container logoArea row row__spread">
                    <div className="logo">
                        <h1>QuickCredit</h1>
                    </div>
                    <div className="row access col__Center">
                        <a href="/signup"><button className="jumbobtn btn ml-1">Sign Up</button></a>
                        <a href="/signin"><button className="jumbobtn btn">Login</button></a>
                    </div>
                    <div className="navBtn" onClick={toggleShow}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
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
                            <img src='/img/magnifying.png' />
                        </button>
                    </form>
                </nav>
                <div className="container mt-4 pb-2">
                    <p>WE HELP YOU</p>
                    <h2> Get A Loan In A Short Time</h2>
                    <p>Save yourself the stress of filling enormous forms just for the sake of getting a loan. Get a loan in
                        record time and with little effort .....</p>
                    <div>
                        <div className="apply">
                            <button className="btn"><a href="/apply">Apply For A Loan</a></button>
                        </div>
                    </div>
                </div>
            </div>
            <section id="provide" className="container about row row_center col_Center ">
        <div className="col col__Center col-4 padding ontimeService">
            <img src="/img/home-icon-1.png" alt=""/>
            <div className="text_center">
                <h4>On Time Service</h4>
                <p>Your loan applications are approved in record time.</p>
            </div>

        </div>
        <div className="col col__Center col-4 padding professionalsTeam">
            <img src="/img/home-icon-2.png" alt=""/>
            <div className="text_center">
                <h4>A Team Of Professionals</h4>
                <p>A dedicated team is available for whatsoever enquiries you might have.</p>
            </div>
        </div>
        <div className="col col__Center col-4 padding analyseBusiness">
            <img src="/img/home-icon-3.png" alt=""/>
            <div className="text_center">
                <h4>Boost Your Business</h4>
                <p>Get enough loan to take that business to the next level.</p>
            </div>

        </div>
    </section>
            <section className="col col__Center padding " id="services">
                <div className="sectionHeading ">
                    <h2 className="text_center">Services We Provide</h2>
                    <h6 className="text_center">Covered In This Areas</h6>
                </div>
                <div className="row container padding serviceGrid">
                    <div className="col col__Center col-4 eachService">
                        <img src="/img/carLoan.jpg" alt="" width="75px" height="75px"/>
                        <div className="text_center">
                            <h4>CAR LOANS</h4>
                            <p>Need To Buy A Car? We Have Got You Covered.</p>
                        </div>
                    </div>
                    <div className="col col__Center col-4 eachService">
                        <img src="/img/houseLoan.png" alt="" width="75px" height="75px"/>
                        <div className="text_center">
                            <h4>HOME LOANS</h4>
                            <p>A Roof Can Be Over Your Head In No Time, Our Housing Loans Are The Best</p>
                        </div>
                    </div>
                    <div className="col col__Center col-4 eachService">
                        <img src="/img/lend.png" alt="" width="75px" height="75px"/>
                        <div className="text_center">
                            <h4>QUICK CASH</h4>
                            <p>Empty Pockets Are Not A Good Thing, Get A Refill Today</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className=" requestCallBack">
                <div className="container row padding">
                    <div className=" requestCallBackText mb-2 col-6">
                        <h3>Request Call Back</h3>
                        <hr/>
                        <p>Do You Have A Message Or An Enquiry To Make? Reach Out To Us You Will Get A Reply In No Time.</p>
                    </div>
                    <div className=" col-6 requestCallBackForm">
                        <form action="" method="post" className="container row row__spread">
                            <input type="text" name="" id="" className="col-5 mb-2" placeholder="Full Name*"/>
                            <input type="email" name="" id="" className="col-5 mb-2" placeholder="Email*"/>
                            <input type="text" name="" id="" className="col-5 mb-2" placeholder="Subject*"/>
                            <input type="number" name="" id="" className="col-5 mb-2" placeholder="Phone Number"/>
                            <textarea name="" id="" cols="30" rows="10" className="col-12 mb-2" placeholder="Message*"></textarea>
                            <button type="submit" className="btn">Submit Now</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="container col col__Center mission padding">
                <div className="col- missionImg">
                    <img src="/img/mission.jpg" alt=""/>
                </div>
                <div className="col col__Center col-6 Text">
                    <h1 className="quote text_center">"</h1>
                    <div className="text_center ">
                        <p>Trade money for time, not time for money. You’re going to run out of time first. </p>
                    </div>
                    <div className="yoursFaithfully text_center">
                        <p>Naval Ravikant</p>
                    </div>
                </div>
            </section>
            <footer className=" index-footer">
                <div className="container row row__spread col__Center">
                    <div className=" col-5 col-s-5">
                        <div className=" address">
                            <h3>QuickCredit</h3>
                        </div>
                    </div>
                    <div className=" col-5 col-s-5">
                        <div className="r-txt-align">Copyright 2019, All Right Reserved</div>
                    </div>
                </div>
            </footer>
        </>
    )
}

import React from 'react';
import Apply from './Apply';
import SmHeader, {sideProvider, useSideProvider} from './Drawer';
import useAuth from '../context/authenticate';
import History from './History';

export default function ApplyMain(){

  const [sections, setSections] = React.useState({
    apply :true
})
const {show, setShow} = useSideProvider();

const {logout} = useAuth();

const handleClose = (e) => {
  e.preventDefault()
  setShow(!show)
}

function openTab(evt, id) {
  setSections({
      [id]: true
  })
  setShow(false)
}
  return(
    <>
    <div className=" col-12 row row__Spread">
      <aside className="sidebar col-2">
        <div className="logo row col__Center">
          <a href="/index">
            <h1>QuickCredit</h1>
          </a>
        </div>
        <hr className=""/>
        <div className="sideNav col row__spread col__Center">
          <div>
            <ul className="">
            <li className="sideNavItem ">
                <button className=" tablinks" onClick={event => openTab(event, 'apply')}>
                Apply For Loan
                </button>
            </li>
            <li className="sideNavItem ">
                <button className=" tablinks" onClick={event => openTab(event, 'history')}>
                Loan History
                </button>
            </li>
            </ul>
          </div>
          <div>
            <ul className="">
              <li className="sideNavItem " onClick={() => logout()}>
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <section className="col-10 mainDashboard">
        <div className="row row__spread container mainDashboard__header">
          <div className="dhead col-3 row">
            <p>Dashboard | welcome David</p>
          </div>
          <div className="row dashNprofile col-8">
            <div className="row  ">
  
              <form className=" row col__center search dashNav">
                <input type="search" name="search" id="search" placeholder="Search" className="col-11"/>
                <button type="submit" className="col-1 ">
                  <img src='./img/magnifying.png' />
                </button>
              </form>
              <div className="user circle"></div>
            </div>
          </div>
        </div>
        <SmHeader />
        {show && <div id="mySidenav" className="sidenav paddinglr">
          <a href="" onClick={handleClose}  className="closebtn">&times;</a>
          <ul>
            <li className="sideNavItem ">
                <button className=" tablinks" onClick={event => openTab(event, 'apply4loan')}>
                Apply For Loan
                </button>
            </li>
            <li className="sideNavItem ">
                <button className=" tablinks" onClick={event => openTab(event, 'history')}>
                Loan History
                </button>
            </li>
            <li className="sideNavItem ">
              <a href="/index" id="home">home</a>
            </li>
            <li className="links sideNavItem"><a href="/apply"><button className="btn"> Apply Loan</button></a></li>
          </ul>
        </div>}
        <hr/>
        <div id="canvas">
         {sections.apply && <Apply />}
          {sections.history && <History />}
        </div>
    </section>
    </div>
    </>
  )
}


import React from 'react';
import DrawerMain from './DrawerMain';



const sideContext = React.createContext();

export const SideProvider = ({children}) => {
    const [show, setShow] = React.useState(false)

    return <sideContext.Provider value={{show, setShow}}>
        {children}
    </sideContext.Provider>
}

export const useSideProvider = () => {
    const context = React.useContext(sideContext);
    console.log('xontext is', context)
    return context;
}


export default function SmHeader(){
    const context = React.useContext(sideContext);
    const handleClick = () => {
        console.log('clciked')
        context.setShow(true)
    }

    

    return(
        <div className="mainDashboard_s_header pt">
        <div className="row col-s-12 row__spread col__Center">
            <div className="dhead col-s-8 col col__Center row">
                <p>Dashboard | welcome Admin</p>
            </div>
            <div className="row col-s-2">
                <div className="user circle"></div>
            </div>
            <div className="col-s-2">
                <DrawerMain />
            </div>
        </div>
    </div>
    )
}
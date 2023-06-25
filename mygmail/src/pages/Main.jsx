import { Suspense, useState } from 'react';
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import Emails from '../components/Emails';
import { Outlet } from 'react-router-dom';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { Box } from '@mui/material';
//we are managing the toogle of sidebar because it is control by menu button present in header so here bot header component and sidebar component is used
//so we perform this task here in main.jsx
//created functional Component
const Main = () => {
    //initially set the toggle to true means open
    const [openDrawer, setOpenDrawer] = useState(true);
    //then set drawer to opp of current state (if open close and if close then open)
    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }
    return(
        <>
            <Header toggleDrawer= { toggleDrawer }/>
            <Box>
                <SideBar openDrawer= { openDrawer }/>
                <Suspense fallback={<SuspenseLoader/>}>
                    <Outlet context={{openDrawer}}/>
                </Suspense>
            </Box>
            
        </>
    )

}

export default Main;
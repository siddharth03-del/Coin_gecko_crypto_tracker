import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
function MainLayout({setword}){
    return(
        <>
            <Navbar setword={setword}/>
            <Outlet/>
        </>
    )
}
export default MainLayout;
import { fetchCoinData } from "./Services/fetchCoinData";
import { useState } from "react";
import Routing from "./Route/Routing";
import { createContext } from "react";
import { MyContext } from "./MyContext";
function App(){
    const [currency, setcurrency] = useState('usd');
    return (
        <>
            <MyContext.Provider value={{currency, setcurrency}}>
                <Routing/>
            </MyContext.Provider>
        </>
    )
}
export default App;
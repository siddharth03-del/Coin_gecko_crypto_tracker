
import { useState } from "react";
import Routing from "./Route/Routing";
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
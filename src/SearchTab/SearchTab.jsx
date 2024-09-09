import { useState } from "react";
import store from "../State/Store";
function SearchTab({setword}){
    const [value, setvalue] = useState('');
    function handlechange(event){
        setvalue(event.target.value);
        setword(event.target.value);
    }
    return(
        <div className="mr-2">
            <input type="text" className="w-80 h-10 border-2 pl-3 pr-3 border-black rounded-3xl" value={value} onChange={handlechange} placeholder="Search"/>
        </div>
    )
}
export default SearchTab;
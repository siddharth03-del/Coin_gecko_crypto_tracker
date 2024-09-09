import { useLocation } from "react-router-dom";
import CompareDetailsContainer from "../CompareDetails/CompareDetailsContainer";
function Compare(){
    const location = useLocation();
    const array = location.state.comparelist;
    return(
        <div className="w-full h-[90.5vh] flex flex-col">
            {
                array.map((id)=>{
                    return(
                        <div key={["comparecontent",id]} className="flex-grow">
                            <CompareDetailsContainer id={id}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Compare;
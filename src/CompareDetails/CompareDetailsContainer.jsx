import { useQuery } from "react-query";
import {fetchCoinHistoricData} from "../Services/fetchCoinHistoricData";
import CompareDetails from "./CompareDetails";
function CompareDetailsContainer({id}){
    const {data} = useQuery(["coinhistoric",id],
        ()=>fetchCoinHistoricData(id, 90 , "daily", "usd"),
        {
            cacheTime: 1000*60*2,
            staleTime: 1000*60*2,
        }
    )
    return(
        <div className="">
            <CompareDetails historicdata={data} name={id}/>
        </div>
    )
}
export default CompareDetailsContainer;
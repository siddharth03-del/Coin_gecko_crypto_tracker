import { fetchCoinHistoricData } from "../Services/fetchCoinHistoricData";
import { useQuery } from "react-query";
import { useState } from "react";
import store from "../State/store.js";
export function useFetchCoinHistory(coinId){
    const currency = store((state)=> state.currency);
    const [days, setdays] = useState(7);
    const [interval, setinterval] = useState('daily');
    const {data: historicdata} = useQuery(['coinhistoricdata', coinId, currency, days],
        ()=>fetchCoinHistoricData(coinId, days,interval, currency),
        {
            cacheTime: 1000*60*2,
            staleTime: 1000*60*2,
        }
    )
    return{
        historicdata,
        days,
        setdays,
        interval,
        setinterval
    }
}
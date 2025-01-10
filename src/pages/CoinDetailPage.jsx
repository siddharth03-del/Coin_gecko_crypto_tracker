import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { fetchCoinDetail } from "../Services/fetchCoinDetail";
import CoinInfoContainer from "../CoinInfo/CoinInfoContainer";
import { useEffect } from "react";
import { getCoinList } from "../Hooks/usefetchCoinList";
import { useState } from "react";
import Suggestions from "../Suggestions/Suggestion";
import Search from "../Search/Search";
function CoinDetail({word, setword, suggestion, updatesuggestion}){
    const [searching, updatesearching] = useState(false);
    useEffect(()=>{
        getCoinList();
    },[])
    useEffect(()=>{
        updatesearching(true);
        Search(word, updatesuggestion);
    },[word])
    const {coinId} = useParams();
    useEffect(()=>{
        setword("");
        console.log("coinId changed");
    },[coinId])
    const {data} = useQuery(['coins', coinId],
        ()=>fetchCoinDetail(coinId),
        {
            cacheTime: 1000*60*2,
            staleTime: 1000*60*2,
        }
    )
    return(
        <div className="flex flex-row">
            {searching && <Suggestions list={suggestion}/>}
            <div className="flex flex-col w-1/3 ml-2">
                <div className="mx-auto">
                    {data && <img src={data.image.large} className="h-[170px] w-[170px]"/>}
                </div>
                <div className="mt-2">
                    {data && <p className="font-mono font-bold">{parse(data.description.en)}</p>}
                </div>
                <div className="flex justify-around mt-3">
                    <div>
                        <h1 className="font-bold text-xl"> Rank </h1>
                    {data && <p >{data.market_cap_rank}</p>}
                    </div>
                    <div>
                        <h1 className="font-bold text-xl"> Current Price</h1>
                    {data && <p>{data.market_data.current_price.usd} </p>}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <CoinInfoContainer coinId={coinId}/>
            </div>
        </div>
    )
}
export default CoinDetail;
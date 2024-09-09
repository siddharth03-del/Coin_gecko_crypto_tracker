import { useQuery } from "react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { fetchCoinData } from "../Services/fetchCoinData";
import { getCoinList } from "../Hooks/usefetchCoinList";
import { useEffect } from "react";
import store from "../State/Store";
function CoinTable(){
    const currency = store((state)=>state.currency);
    const navigate = useNavigate();
    const [page, setpage] = useState(1);
    const { data, isLoading, isError, error} = useQuery(['coins',page, currency],
        ()=>fetchCoinData(page, currency),
        {
            cacheTime: 1000*60*2,
            staleTime: 1000*60*2,
        }
    );
    useEffect(()=>{
        getCoinList();
    },[])
    if(isError){
        return(
            <div>
                {error.message}
            </div>
        )
    }
    function handleredirect(coinId){
        navigate(`detail/${coinId}`)
    }
    if(data?console.log(data):console.log(data, "hello"));
    return(
        <div className="flex flex-col w-10/12 mx-auto mt-10">
            <div className="flex flex-row border border-yellow-500 w-full bg-yellow-400 rounded-xl h-16 items-center pl-2">
                <div className="w-4/12 text-white text-2xl">
                    Coin
                </div>
                <div className="w-3/12 text-white text-2xl">
                    Price
                </div>
                <div className="w-3/12 text-white text-2xl">
                    24h Change
                </div>
                <div className="w-2/12 text-white text-2xl">
                    Market Cap
                </div>
            </div>
            <div>
                {isLoading && <div>Loading...</div>}
                {data && data.map((coin)=>{
                    return(
                        <div onClick={()=>{handleredirect(coin.id)}} key={coin.id} className="flex flex-row w-full bg-blue-400 rounded-xl h-20 items-center pl-2 my-3 cursor-pointer">
                            <div className="flex flex-row items-center w-4/12">
                                <div className="ml-2">
                                    <img src={`${coin.image}`} alt="image" className="h-10 mt-1" />
                                </div>
                                <div className="text-2xl ml-5">
                                    {coin.name}
                                </div>
                            </div>
                            <div className="w-3/12">
                                {coin.current_price}
                            </div>
                            <div className="w-3/12">
                                {coin.price_change_24h}
                            </div>
                            <div className="w-2/12">
                                {coin.market_cap}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center">
                <div className="mr-2">
                    <button className="text-white text-2xl bg-green-600 rounded-xl h-16 w-48" disabled={page == 1?true: false}   onClick={()=>{
                        setpage(page - 1)
                    }}
                    >
                        Previous
                    </button>
                </div>
                <div className="ml-2">
                    <button className="text-white text-2xl bg-green-600 rounded-xl h-16 w-48" onClick={()=>{
                        setpage(page + 1);
                    }}
                    disabled={page == 5 ? true: false}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
}
export default CoinTable;
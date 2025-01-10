import InfiniteScroll from "react-infinite-scroll-component";
import { Children, useContext, useState } from "react"
import { fetchCoinData } from "../Services/fetchCoinData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { MyContext } from "../MyContext";
import { useInfiniteQuery } from "react-query";
function CoinTableInfinite(){
    const navigate = useNavigate();
    const [hasMore, sethasMore] = useState(true);
    const [currentdata, updatecurrentdata] = useState([]);
    const [comparearray, updatecomparearray] = useState([]);
    const [compare, setcompare] = useState(false);
    const {currency} = useContext(MyContext);
    console.log(currency);
    // const {data , refetch} = useQuery(["page", page, currency],
    //     ()=>fetchCoinData(page, currency),
    //     {
    //         cacheTime: 1000*60*2,
    //         staleTime: 1000*60*2,
    //         enabled: false,
    //         retry : 10,
    //         retryDelay : 1000*60
    //     }
    // ) 
    // useEffect(()=>{
    //     console.log("fetchmore data called");
    //     fetchmoredata()
    // },[])
    // useEffect(()=>{
    //     updatnewdata();
    // },[data])
    // function updatnewdata() {
    //         // Use functional update to ensure you have the latest state
    //         if(data){
    //             updatecurrentdata((prevData) => {
    //                 const updatedData = structuredClone(prevData).concat(data);
    //                 return updatedData;
    //             });
    //             setpage((prevPage) => prevPage + 1);
    //             updatedatastate(true);
    //         }
    // }
    function handleredirect(coinId){
        navigate(`detail/${coinId}`)
    }
    // function fetchmoredata(){
    //     refetch();
    // }
    const {data : feed, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery(["coinlist", currency], ({pageParam = 1})=> fetchCoinData(pageParam, currency), {
        getNextPageParam : (lastpage, pages) => {if(lastpage.length > 0){return pages.length+1}else{return undefined}
    }, cacheTime : 1000*60*60,
    staleTime : 1000*60*30
    })
    useEffect(()=>{
        console.log(status);
        if(status === 'success'){ const allData = feed.pages.flat();
            console.log(allData, "allData");
        updatecurrentdata(allData);
        console.log(feed, "feed");
    if(feed.pages[feed.pages.length - 1].length === 0)
        sethasMore(false)};
    },[feed, status])
    return(
        <>
        {compare && <div className="flex flex-row max-h-fit justify-between mt-5">
            <div className="flex flex-row">
                {compare && comparearray.map((data, index)=>{
                    return (
                        <div key={[data, index, "compare"]} className="mx-2 bg-green-500 rounded-2xl">
                            <div className="flex flex-row pb-2 px-1">
                                <p className=" text-2xl text-white font-bold mx-1 mt-2">{data}</p>
                                <button className="hover:cursor-pointer bg-red-500 h-5 w-5 text-sm border rounded-[16px] border-rose-700" onClick={
                                    ()=>{
                                        let newarray = structuredClone(comparearray);
                                        newarray.splice(newarray.findIndex((val)=>val==data), 1);
                                        console.log(newarray);
                                        updatecomparearray(newarray);
                                        if(newarray.length == 0){
                                            setcompare(false);
                                        }
                                    }
                                }>x</button>
                            </div> 
                        </div>
                    )
                })}
            </div>
            <div className="px-4 py-3 border rounded-2xl bg-green-600 hover:cursor-pointer text-bold text-white mr-2" onClick={
                ()=>{navigate('/compare',{state:{comparelist:comparearray}})}
            }>
                Compare
            </div>
        </div>}
        <div className="mt-5 ">  
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
            <InfiniteScroll 
                dataLength={currentdata.length}
                next={
                    ()=>{fetchNextPage()}
                }
                hasMore={hasMore}
                loader={<h4 className="text-2xl mx-auto font-mono font-bold">Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
            >
            {status == "success" && currentdata.map((coin)=>{
                return(
                    <div key={coin.id} onClick={()=>{handleredirect(coin.id)}} className="flex flex-row w-full bg-blue-400 rounded-xl h-20 items-center pl-2 my-3 hover:cursor-pointer hover:bg-blue-300">
                        <div className="flex flex-row items-center w-4/12">
                            <div className="ml-2">
                                <img src={`${coin.image}`} alt="image" className="h-10 mt-1" />
                            </div>
                            <div className="text-2xl ml-5">
                                {coin.name}
                            </div>
                            <div className="text-xs ml-1 mt-2 ">
                                <button
                                    onClick={(event)=>{
                                        event.stopPropagation();
                                        setcompare(true);
                                        if(comparearray.length >= 4){
                                            alert("Not more than 4 can be compared");
                                        }
                                        else{
                                            if(!comparearray.includes(coin.id)){
                                                updatecomparearray([...comparearray, coin.id])
                                            }
                                        }
                                    }}
                                    className="hover:cursor-pointer border hover:bg-green-300 bg-green-600 rounded-md px-1"
                                >
                                    Compare
                                </button>
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
            }
        )}
            </InfiniteScroll>
        </div>
        </>
    )
}
export default CoinTableInfinite;
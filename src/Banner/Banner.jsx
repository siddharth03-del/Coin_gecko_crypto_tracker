import Bannerr from "../assets/banner1.jpeg"
import Suggestions from "../Suggestions/Suggestion";
import { useEffect } from "react";
import Search from "../Search/Search";
function Banner({suggestion, word, updatesuggestion}){
    useEffect(()=>{
        console.log("search called form banner")
        Search(word, updatesuggestion);
    },[word]);
    return(
        <div style={{backgroundImage:`url(${Bannerr})`}} className="bg-center bg-cover h-72  font-mono " >
            <div className="z-20 relative">
            <Suggestions list={suggestion} />
            </div>
            <div className="inline-block ml-[400px]">
            <div className="text-yellow-400 text-5xl mt-10">
                <p className="inline">Crypto Tracker</p>
            </div>
            <div className="text-yellow-400 text-2xl font-mono mt-20">
                <p>The most reliable platform to track crypto</p>
            </div>
            </div>
        </div>
    )
}
export default Banner;
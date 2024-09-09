
import { coinlist } from "../Hooks/usefetchCoinList";

function Search(word, updatesuggestion){
    console.log(word, "from search function");
    let res = [];
    if(word == ''){
        updatesuggestion(res);
        return;
    }
    coinlist.forEach((val)=>{
        if(val.startsWith(word)){
            res.push(val);
        }
    })
    updatesuggestion(res);
    return;
}
export default Search;
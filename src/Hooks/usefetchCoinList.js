import { fetchCoinList } from "../Services/fetchCoinList";
export async function getCoinList(){
    try{
        const data = await fetchCoinList();
        console.log(data);
        let list = [];
        data.map((coins)=>{
            list.push(coins.id);
        })
        console.log(list, "coin list");
        coinlist = list;
        return list;
    }catch{
        console.log("Error fetching coin list");
        return null;
    }
}
export let coinlist = [];
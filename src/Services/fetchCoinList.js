import axios_instance from "../Helpers/axios_instance";
export async function fetchCoinList(){
    try{
        const response =  await axios_instance.get(`/coins/markets?vs_currency=usd`);
        return response.data;
    }catch(error){
        console.log("Error fetching Coin List");
        return null;
    }
}
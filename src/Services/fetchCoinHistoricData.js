import axios_instance from "../Helpers/axios_instance";
export async function fetchCoinHistoricData(id, days, interval,currency){
    try{
        const response = await axios_instance.get(`/coins/${id}/market_chart?days=${days}&vs_currency=${currency}&interval=${interval}`);
        console.log(response.data , "coinhistoricdata");
        return response.data;
    }catch{
        console.log("Error fetching coin historic date");
        return null;
    }
}
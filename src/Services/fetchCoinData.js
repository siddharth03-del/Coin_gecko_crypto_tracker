import axios_instance from "../Helpers/axios_instance";
export async function fetchCoinData(page = 1, currency){
    const per_page = 20;
    try{
        const response = await axios_instance.get(`/coins/markets?vs_currency=${currency}&per_page=${per_page}&page=${page}`);
        console.log(response.data, "fetchcoindata");
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}
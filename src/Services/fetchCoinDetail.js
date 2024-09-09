import axios_instance from "../Helpers/axios_instance";
export async function fetchCoinDetail(id){
    try{
        const response = await axios_instance.get(`/coins/${id}`);
        console.log(response.data, "fetchcoindetail");
        return response.data;
    }catch(error){
        console.log(error);
        return null;
    }
}
import { useFetchCoinHistory } from "../Hooks/usefetchCoinHistory";
import CoinInfo from "./CoinInfo";
function CoinInfoContainer({coinId}){
    const {historicdata, days, setdays, interval, setinterval} = useFetchCoinHistory(coinId);
    return(
        <CoinInfo data={historicdata} days={days} interval={interval} setinterval={setinterval} setdays={setdays}/>
    )
}
export default CoinInfoContainer;
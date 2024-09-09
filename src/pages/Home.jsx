import Banner from "../Banner/Banner";
import CoinTable from "../CoinTable/CoinTable";
import CoinTableInfinite from "../CoinTableInfinite/CoinTableInfinite";
function Homepage({word, updatesuggestion, suggestion}){
    return(
        <>
        <Banner suggestion={suggestion} word={word} updatesuggestion={updatesuggestion}/>
        <CoinTableInfinite currency={"usd"}/>
        </>
    )
}
export default Homepage;
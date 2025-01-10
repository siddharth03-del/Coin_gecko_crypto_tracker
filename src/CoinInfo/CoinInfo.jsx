import { CategoryScale} from "chart.js";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { chartDays } from "../Helpers/constant";
import { useEffect } from "react";
import store from "../State/store.js";
Chart.register(CategoryScale);
function CoinInfo({data, days, setdays, setinterval}){
    const currency = store((state)=>state.currency);
    function handleDayChange(e){
        const dayselected = e.target.options[e.target.selectedIndex].value;
        if(dayselected == 1){
            setinterval?.('');
        }else{
            setinterval?.('daily');
        }
        setdays?.(e.target.options[e.target.selectedIndex].value);
    }
    useEffect(()=>{
        console.log(days);
    },[days]);
    if(!data){
        return null;
    }
    return (
        <div className="ml-10">
            <div className="h-[500px] w-[87%]">
            <Line
                data={
                    {
                        labels: data.prices.map((price)=>{
                            let date = new Date(price[0]);
                            let time = date?.getHours() > 12 ? `${date?.getHours() - 12}:${date?.getMinutes()}` : `${date?.getHours()}:${date.getMinutes()} AM`;
                            date = date.toLocaleDateString();
                            return days === 1 ? time : date;
                        }),
                        datasets:[
                            {
                                label : `Price (Past ${days} ${days === 1 ? 'Day' : 'Days'}) in ${currency?.toUpperCase()}`,
                                data: data.prices.map(price=>price[1]) , 
                            }
                        ],
                    }
                }
                options={
                    {
                        responsive: true,
                        maintainAspectRatio: false,
                        elements:{
                            point:{
                                radius: 0
                            }
                        },
                    }
                }
            />
        </div>
        <div className="mt-7">
                <select className="flex justify-center border-black border-2 px-2 rounded-2xl mt-5 w-[87%]" onChange={handleDayChange}>
                    {
                        chartDays.map((day, index) =>{
                            return(
                                <option selected={days == day.value} key={index} value={day.value}>{day.label}</option>
                            )
                        })
                    }
                </select>
        </div>
        </div>
    )
}
export default CoinInfo;

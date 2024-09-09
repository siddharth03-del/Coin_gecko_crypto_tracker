import { CategoryScale} from "chart.js";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
Chart.register(CategoryScale);
function CompareDetails({historicdata, name}){
    if(!historicdata){
        return null;
    }
    return(
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-full  justify-center py-4">
                <h1 className="text-green-600 font-mono text-2xl font-bold">
                    {name.toUpperCase()}
                </h1>
            </div>
            <div className="w-full h-[250px]">
            <Line
                data={
                    {
                        labels: historicdata.prices.map((price)=>{
                            let date = new Date(price[0]);
                            return date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                label: `Price past 90 days in usd`,
                                data: historicdata.prices.map(price=>price[1]),
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
                                radius:0
                            }
                        },
                    }
                }
            />
            </div>
        </div>
    )
}
export default CompareDetails;
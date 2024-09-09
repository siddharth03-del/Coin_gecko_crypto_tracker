import { useNavigate } from "react-router-dom";
function Suggestions({list}){
    const navigate = useNavigate();
    function redirect(value){
        // updatesearching(false);
        console.log("redirect called");
        // setword('');
        navigate(`/detail/${value}`)
    }
    return(
        <div className={`flex flex-col w-80 max-h-72 overflow-scroll absolute z-50 ml-[785px] bg-transparent scrollbar-hide`}>
            {
                list.map((val)=>{
                    return(
                        <div key={val} className="w-full  border-black rounded-3xl my-1 bg-white text-center py-3 hover:cursor-pointer hover:bg-purple-500 hover:text-2xl" onClick={()=>{redirect(val)}}>
                            <h1 className="font-mono font-bold">{val}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Suggestions;
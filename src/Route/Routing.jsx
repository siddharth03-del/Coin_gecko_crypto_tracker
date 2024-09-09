import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../pages/Layout";
import Homepage from "../pages/Home";
import CoinDetail from "../pages/CoinDetailPage";
import { useState } from "react";
import CustomErrorBoundary from "../CustomErrorBoundary/CustomErrorBoundary";
import MyLoader from "../PageLoader/PageLoader";
import Compare from "../Compare/Compare";
function Routing(){
    const [word, setword] = useState('');
    const [suggestion, updatesuggestion] = useState([]);
    return(
        <CustomErrorBoundary>
            <Routes>
                <Route path="/" element={<MainLayout setword={setword}/>}>
                <Route index element={
                    <Suspense
                        fallback={<MyLoader/>}
                    >
                        <Homepage suggestion={suggestion} updatesuggestion={updatesuggestion} word={word}/>
                    </Suspense>
                    }/>
                <Route path="/detail/:coinId" element={
                    <Suspense
                        fallback={<MyLoader/>}
                    >
                        <CoinDetail  word={word} setword={setword} suggestion={suggestion} updatesuggestion={updatesuggestion}/>
                    </Suspense>
                    }/>
                <Route
                    path="/compare" 
                    element={
                        <Suspense fallback={<MyLoader/>}>
                            <Compare/>
                        </Suspense>
                    }                
                />
                </Route>
            </Routes>
        </CustomErrorBoundary>
    )
}
export default Routing;
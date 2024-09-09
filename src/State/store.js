import { create } from 'zustand';

const store = create((set)=>({
    currency : 'usd',
    setCurrency : (curr)=> set(() =>({ currency: curr })),
}));
export default store;
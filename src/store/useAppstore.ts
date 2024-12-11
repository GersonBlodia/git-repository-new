import { create } from "zustand";

type StoreState= {
    isActive: boolean;
    isDropdownOpen:boolean; 
    onClickMenuBurguer:(value:boolean)=>void;
    toggleDropdown:()=>void;
}
export const useStoreState =create<StoreState> ((set)=>({
    isActive:false,
    isDropdownOpen:false,
    onClickMenuBurguer: (value) => set(
        {isActive: value }
    ),
    toggleDropdown:()=>set(state=>({
         isDropdownOpen:!state.isDropdownOpen
    }))
}))
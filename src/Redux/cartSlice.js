import { createSlice } from "@reduxjs/toolkit";
const initialState={
    carts:[]
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        add(state,action){
            const indexnumber = state.carts.findIndex((item)=>item.id === action.payload.id)
            if(indexnumber >=0){
                state.carts[indexnumber].qty +=1;
            }else{
                const newentry = {...action.payload, qty:1}
                state.carts = [...state.carts, newentry];
            }
        // state.push(action.payload)
    
        },
         removesingleitem (state,action){
            const removeindex = state.carts.findIndex((item)=>item.id === action.payload.id)
            if( state.carts[removeindex].qty >1){
                state.carts[removeindex].qty -=1
            }
         },
       remove(state,action){
       const delitem = state.carts.filter((item)=>item.id !== action.payload)
             state.carts =  delitem;
       }
    }
})
export const{add , remove , removesingleitem}= cartSlice.actions;
export default cartSlice.reducer


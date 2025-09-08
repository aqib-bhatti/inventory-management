import {configureStore} from "@reduxjs/toolkit"

import inventoryReducer from "./slices/inventoryslice"
import stockSlice from "./slices/stockSlice"
import authslices from "./slices/authslices"

export const store = configureStore ({
    reducer :{
        inventory : inventoryReducer,
        stock :stockSlice,
        auth:authslices
    }
})
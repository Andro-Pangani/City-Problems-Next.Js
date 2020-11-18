import {createSlice} from '@reduxjs/toolkit'

export const mainDataSlice = createSlice({
 name: 'main_data',
 initialState: [],
 reducers:{
  mainDataSuccess: (state, action) => action.payload 
 }
})

export const main_data_reducer = mainDataSlice.reducer;
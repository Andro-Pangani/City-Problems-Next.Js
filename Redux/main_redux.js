import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import {main_data_reducer} from './actions/(_a-_r)_main_data'



export let store = configureStore({
 reducer: combineReducers({
  main_data: main_data_reducer,
  current_post: null
 })

});

store.subscribe(() => {
 console.log(store.getState(), ' <- StoreSubsribed');
})

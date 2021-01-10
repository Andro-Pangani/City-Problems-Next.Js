import { type } from "../types"

export const setLanguage = (payload) => {
 switch(payload){
  case 'En':
   return {type: type.Languages.setLanguage_En};
  case 'Ru': 
   return {type: type.Languages.setLanguage_Ru};
  case 'Ge': 
   return {type: type.Languages.setLanguage_Ge};
 }
}


const initialState = {
 language: 'Georgian'
}

export const setLanguagesReducer = (state = 'Georgian', action) => {
 switch(action.type){
  case type.Languages.setLanguage_En:
   return 'English';
   case type.Languages.setLanguage_Ru: 
   return 'Russian';
   case type.Languages.setLanguage_Ge:
    return 'Georgian';
    default: return state;
 }
}
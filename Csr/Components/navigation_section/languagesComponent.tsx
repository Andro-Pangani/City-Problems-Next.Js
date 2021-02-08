import React ,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { setLanguage } from '../../Redux/languages/( a - r ) languages';



const langs = ['Ge', 'En', 'Ru'];

function LanguagesItem({text, changeLanguage}){

const handleClick = () => {
 changeLanguage(text)
}

 return (
  <span className="languages_item-text"
   onClick={handleClick}
  >
   {text}
  </span>
 )
}


// DISPATCHES ACTION WICH CHANGES LANGUAGE
export function LanguagesComponent(props){                                 

 const [active, setActive] = useState('Ge')
 const [langList, showLangList] = useState(false);

 const dispatch = useDispatch()
 
 const changeLanguage = (lang) => {
  console.log(lang);
  setActive(lang);
  dispatch(setLanguage(lang))
 }

 const lang_list = (e) => {
  showLangList(!langList);
  e.stopPropagation();
  console.log("Lang List");
  
 }
 
 return(
  <div onClick={lang_list} className="languages_container">

   <ul className="languages_list"
   
   >
   {
    langs.map(item => {
     return (
     <li key={item} className="languages_list_item">
      <LanguagesItem changeLanguage={changeLanguage} text={item} />
     </li>)
    })
   }
   </ul>
  </div>
 )
}
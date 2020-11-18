import {useRouter} from 'next/router'
import {useState, useEffect} from 'react';
import Head from 'next/head';
import { MainLayout } from '../../components/mainLayout';
import { HeaderComponent } from '../../components/header_section';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Post({data}){

 const router = useRouter()
 // const content = useSelector(state => state.current_post)

 useEffect(() => {
  console.log(router, ' <- Current Post Content');
  // console.log('Context as a prop -> ',params);
 },[])

 console.log(router.query, ' from post');

 return (
 <>
  <Head>
 <title>{}</title>
  </Head>
   <HeaderComponent />
   <div className="post_item">
   <li>
   <h1 className='post_title'>
     {data.name}
   </h1>
   </li>
   <li>
   <span className="post_genres">
    Ganres: {data.genres.map(genre => genre)}
   </span>
   </li>
   <li>
   <img src={data.image.medium} />

   </li>

   <button className="back_bottom">
    <Link href={'/posts'}><a>Back</a></Link>
   </button>

   </div>
 </>
 )
}

export async function getServerSideProps(context){
 
// try{
//  const response = await fetch(`http://api.tvmaze.com/shows/${context.params.postId}`);

//  const data = await response.json();
// } catch(error) {
//  console.log("Error Handler on Server Side post Id", error);
//  throw error;
// }
  

   console.log(context.params.postId,data, ' ######  data from SERVER SIDE PROPS');

 return{
  props: {
   data: data
  }
 }
}
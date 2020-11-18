
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/main.module.css'
export function AqiSection(){

 return(
  <div className='main_item'>
  {/* <Head> */}
   {/* <title>Aqi Section</title> */}
  {/* </Head> */}
  <h1>I am Aqi Section</h1>
  <nav>
   <ul className="aqiNavMenu">
    <li className="aqiNavItem">
     <Link href={'/aqi/tbilisi'}>
      <a>Tbilisi</a>
     </Link>
     <Link href={'/aqi/rustavi'}>
      <a>Rustavi</a>
     </Link>
     <Link href={'/aqi/batumi'}>
      <a>Batumi</a>
     </Link>
     <Link href={'/aqi/kutaisi'}>
      <a>Kutaisi</a>
     </Link>
    </li>
   </ul>
  </nav>
  </div>
 )

}
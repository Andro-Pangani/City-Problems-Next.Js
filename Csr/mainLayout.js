

import Link from 'next/link'
import { AqiSection } from './nextComponents/aqiSection'
import { MapComponent } from './nextComponents/mapComponent'
import Head from 'next/head'
import { HeaderComponent } from './nextComponents/header_section'
import { useEffect, useState } from 'react'

export function MainLayout({children, title='Base'}){

 const [didMount, setDidMount] = useState(false)

 useEffect(() => {
  
  if(!didMount){
   setDidMount(true);
   console.log('######### Main Layout Updated => ');
  }

  return () => {
   console.log('##### Did Unmount ########## ');
  }

 })

 return(
  <>
   <Head>
    <title>{title}</title>
   </Head>
   <div className={'app_container'}
   >
   <HeaderComponent />
   <main className="main_content">
   <div className="main_item data_container">
    {children}
    </div>
   <AqiSection />
   <MapComponent />
   </main>


   </div>
  </>
 )
}
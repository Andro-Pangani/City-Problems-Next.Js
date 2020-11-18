

import Link from 'next/link'
import { AqiSection } from './aqiSection'
import { MapComponent } from './mapComponent'
import Head from 'next/head'
import { HeaderComponent } from './header_section'

export function MainLayout({children, title='Base'}){

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
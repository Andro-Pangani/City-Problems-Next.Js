import Head from 'next/head'
import Link from 'next/link';
import { AqiSection } from '../components/aqiSection';
import { HeaderComponent } from '../components/header_section';
import { MainLayout } from '../components/mainLayout';

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
   <div className="appContainer">

    <MainLayout title={'Home'}>
    <h2> Welcome to Home Page</h2>
   </MainLayout>

   </div>
  )
}

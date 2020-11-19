import Router from 'next/router'
import { MainLayout } from '../Csr/mainLayout'
import styles from '../styles/main.module.css';

export default function AboutPage(){


 const clickHandler = () => {
  Router.push('/')
 }

 return(
 <MainLayout title={'About Page'}>
  <div className={styles.mainItem}>
  <h1>About Page</h1>
  <button
  onClick={clickHandler}
  > to Home</button>
  </div>
 </MainLayout>
 )
}
import Link from "next/link";
import classes from './error.module.scss'


export default function ErrorPage(){
 return(
  <div className={classes.error_container}>
   <h1> 404 Error Page Not Found</h1>
   <Link href="/"><a>Go Back Home </a></Link>
  </div>
 )
}

import Link from 'next/link'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';



export function CurrentPostComponent(props){
 const router = useRouter();
 const dispatch = useDispatch();

 const handleClick = () => {
  console.log('Click Handled from Current Post');
  router.push(`/posts/${props.data.id}`)
 }

 return(
 <div className="post_item"
 onClick={handleClick}
 >
  <div className="post_title"
 >
   {props.data.name}
  {/* </Link> */}
 </div>
  <img className="post_image" src={props.data.image.medium} />
 </div>
 )
}
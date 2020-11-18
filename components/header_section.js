import Link from 'next/link'


export function HeaderComponent() {

 return(
  <div className="header_section">
  <nav className="header_content">
    <ul className="header_nav_list">
     <li className="header_nav_item">
      <Link href={'/'}>
       <a>Home</a>
      </Link>
     </li>
     <li className="header_nav_item">
      <Link href={'/posts'}>
       <a>Posts</a>
      </Link>
     </li>
     <li className="header_nav_item">
      <Link href={'/about'}>
       <a>About</a>
      </Link>
     </li>
    </ul>
   </nav>
  </div>
 )
}
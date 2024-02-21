
import { Link } from 'react-router-dom' //redirect between pages without refreshing

export default function Header() {
  return (
    <div className='bg-sky-200'> 
      <div className='flex justify-between items-center
      max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Authenticator</h1>
        </Link>
        <ul className='flex gap-3'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/sign-in'>
            <li>Sign-In</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

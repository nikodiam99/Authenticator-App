
import { Link } from 'react-router-dom' //redirect between pages without refreshing
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
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
          <Link to='/profile'>
            {currentUser ? (
              <img src = {currentUser.profilePicture} alt='profile' className='h7 w-7 rounded-full
              object-cover'/>
            ):(
              <li>Sign-In</li>
            ) }
            
          </Link>
        </ul>
      </div>
    </div>
  )
}

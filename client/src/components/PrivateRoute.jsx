import React from 'react'
import  {useSelector} from 'react-redux'
import { Outlet, Navigate} from 'react-router-dom'

export default function privateRoute() {
    const {currentUser} = useSelector(state => state.user)
    //render children if there is no current user, otherwise go to sign in page
  return currentUser ? <Outlet/> : <Navigate to = '/sign-in'/>
    
  
}

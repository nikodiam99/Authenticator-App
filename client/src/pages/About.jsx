import React from 'react'

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
    <h1 className='text-3xl font-bold mb-4 text-sky-700'>About</h1>
    <p className='mb-4 text-sky-900'>This is a MERN (MongoDB, Express, React, Node.js) stack application with 
    authentication. It allows users to sign up, log in, and log out, delete & update account, 
    and provides access to protected routes only for authenticated 
    users.</p>
  </div>
  )
}

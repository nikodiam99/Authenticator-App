import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//NIKO VERSION
export default function SignIn() {
  const [formData, setFormData] = useState({}); //a piece of state to save all of the stuff
  const [error, setError] = useState(false);
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    //strip operator "..." to keep prev value of form operator
    //ex: when we write something in username input, "[e.target.id]:" is username and the "e.target.value" is what we put in and save
    setFormData({ ...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
      setLoading(true);
      //remove any previous errors
      setError(false);
      const res = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(true);
        return;
      }
      navigate('/');
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Email' id='email' className='bg-sky-100 p-3 rounded-lg'
        onChange={handleChange}/>
        <input type="text" placeholder='Password' id='password' className='bg-sky-100 p-3 rounded-lg'
        onChange={handleChange}/>
        <button disabled = {loading} className='bg-sky-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign-Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
    </div>
  );
}


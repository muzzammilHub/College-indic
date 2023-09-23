import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = ()=>{
    setIsSignIn(!isSignIn);
  }

  const handleFormSubmit = async (e)=>{
       e.preventDefault();
       try {
            if(isSignIn){
                const {data} = await axios.post("/api/v1/login",{email, password});
                dispatch(addUser(data.user));
                navigate('/');
            }
            else{
                const {data} = await axios.post("/api/v1/register", {name, email, password});
                dispatch(addUser(data.user));
                navigate('/');
            }   
       } catch (error) {
          console.error("SignUp failed: ", error);
       } 
  }



  return (
    <div className=' h-[76vh]'>
        <form
            onSubmit={handleFormSubmit}
            className=" w-10/12 md:w-3/12 p-12 bg-green-200 mt-20 mx-auto shadow-2xl rounded-lg">
            <p 
                className=" font-semibold text-red-500 text-3xl">
                   {isSignIn ? "Sign In" : "Sign Up"}
            </p>
                {!isSignIn && <input 
                    className=" w-full p-3 outline-none bg-[#3A3433] rounded-md mt-8 text-slate-400" 
                    type="text" 
                    placeholder="name" 
                    onChange={(e)=>setName(e.target.value)}
                    name="name"
                    value={name}
                    required>
                </input>}
            <input 
                className=" w-full p-3 outline-none bg-[#3A3433] rounded-md mt-6 text-slate-400" 
                type="email" 
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                value={email}
                required>
            </input>
            <input
                className=" w-full p-3 outline-none bg-[#3A3433] rounded-md mt-4 mb-8 text-slate-400" 
                type="password" 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                value={password}
                required>
            </input>
            <button
                type='submit'
                className=" w-full p-3 outline-none bg-red-600 rounded-md mt-8 mb-8 font-bold text-white" 
                >{isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <p 
                className=" md:text-lg text-[#766d6c] ">
                        {isSignIn? "Don't have an account?Register Now": "Already registered?"} 
                <a onClick={toggleForm} className=" text-red-500" href="#">
                        {isSignIn? "Sign up now.": "Sign in now"}
                </a>
            </p>
        </form>
    </div>
  )
}

export default Login
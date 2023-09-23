import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';


const Header = () => {
 const user = useSelector((store)=>store.user);
 const dispatch = useDispatch();

 const handleLogout = async (e)=>{
    e.preventDefault();

    try {
        const {data} = await axios.get("/api/v1/logout");
        dispatch(removeUser());

        console.log(data.message);
    } catch (error) {
        console.error("Logout failed: ", error);
    }
 } 

  return (
    <div className=' flex justify-between bg-green-200 items-center overflow-y-hidden'>
        <Link to='/'><p className=' p-4 ml-4 text-3xl font-bold'>CollegeIndic</p></Link>
        
        {user ? ( 
        <button 
        onClick={handleLogout}
        className=' m-6 pt-2 pb-2 pr-3 pl-3 bg-white border border-black rounded-md shadow-md font-semibold'>Logout</button>)
        :
        (<Link to='/loginpage'> 
        <button className=' m-6 pt-2 pb-2 pr-3 pl-3 bg-white border border-black rounded-md shadow-md font-semibold'>Login</button>
        </Link>)}
        
    </div>
  )
}

export default Header
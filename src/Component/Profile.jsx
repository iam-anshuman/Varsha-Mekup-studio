import React,{useState} from 'react'
import { IoIosPerson } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import clsx from 'clsx';
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom';
import { PersonIcon } from './Icons';

export default function Profile(props) {
    const [isOPen,setIsOpen] = useState(false);
    const {logout} = useLogout();

    const styleClass = clsx(`absolute w-48 border-blue-50 border-2 border-t-4  top-[4.7rem] -left-16 max-md:-left-2 max-md:top-[1.8rem] rounded-md z-10 duration-300 ease-in-out ${isOPen?'scale-100':'scale-0'}`);
  return (
    <>
    <div className="flex relative">
        <p className="text-center h-10 w-10 rounded-full ring-offset-1 ring-1 ring-white bg-slate-700 py-2 cursor-pointer max-sm:absolute max-sm:-top-16 max-sm:left-2 z-0" onClick={()=>{setIsOpen(!isOPen)}}><PersonIcon/></p>
        <div className={styleClass}>
            <div className="bg-slate-700 text-white text-left">
                <Link className="text-lg block border-b-2 p-2 cursor-pointer hover:bg-slate-800" to={"/my-profile"}>
                    <IoIosPerson className='inline mb-1 mr-2' size={25}/>
                    My Profile
                </Link>
                <div className="text-lg p-2 cursor-pointer hover:bg-slate-800" onClick={()=>{logout()}}>
                    <MdLogout className='inline mb-1 mr-2' size={25} />
                    Logout</div>
            </div>
        </div>
    </div> 
    </>
  )
}

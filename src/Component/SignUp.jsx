import React , {useState} from 'react';
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { OpenEyeIcon, ClosedEyeIcon } from './Icons';


export default function SignUp() {

	const {signup,error,isLoading} = useSignup();
	const {user} = useAuthContext();
	const [isHidePassword, setIsHidePassword] = useState(true);


	  const handleSignupUser = async(e)=>{
		e.preventDefault();
		const firstName = e.target.firstName.value;
		const lastName = e.target.lastName.value;
		const phone = e.target.phone.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const response = await signup(firstName,lastName,phone,email, password);
		response && console.log(response);
		error && alert(error);
		e.target.firstName.value = '';
		e.target.lastName.value = '';
		e.target.phone.value = '';
		e.target.email.value = '';
		e.target.password.value = '';

	  }

	  const handlePasswordHide = ()=>{
		setIsHidePassword(!isHidePassword);
		if(isHidePassword){
		  document.getElementById('password').setAttribute('type','text');
		}
		else{
		  document.getElementById('password').setAttribute('type','password');
		} 
	  }

  return (
    <>
{     user ? <Navigate to={"/"}/> :
<section className="text-gray-400 bg-gray-900 body-font">
    <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
    	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
    		<div
    			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    		</div>
    		<div className="relative px-4 py-10 bg-slate-700 shadow-lg sm:rounded-3xl sm:p-20">
    			<div className="max-w-xl mx-auto">
    				<div>
    					<h1 className="text-2xl font-semibold text-white">Signup</h1>
              <p>Please fill in the form to create an account</p>
    				</div>
    				<div className="divide-y divide-gray-200">
    					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
							<form onSubmit={handleSignupUser}>								
                	<div className="relative flex">
    						<div className=" relative w-1/2">
    							<input autoComplete="off" id="firstName" name="firstName" type="text" className="peer placeholder-transparent h-10 my-4 w-3/4 border-b-2 bg-slate-700 border-slate-950 text-gray-200 focus:outline-none focus:borer-rose-600" placeholder="First Name" />
    							<label htmlFor="firstName" className="absolute left-0 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">First Name</label>
    						</div>
    						<div className="relative w-1/2">
    							<input autoComplete="off" id="lastName" name="lastName" type="text" className="peer placeholder-transparent h-10 my-4 w-3/4 border-b-2 bg-slate-700 border-slate-950 text-gray-200 focus:outline-none focus:borer-rose-600" placeholder="Last Name" />
    							<label htmlFor="lastName" className="absolute left-0 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Last Name</label>
    						</div>
                	</div>
    						<div className="relative">
    							<input autoComplete="off" id="phone" name="phone" type="number" className="peer placeholder-transparent h-10 w-full my-4 border-b-2 bg-slate-700 border-slate-950 text-gray-200 focus:outline-none focus:borer-rose-600" placeholder="Mobile Number" />
    							<label htmlFor="phone" className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Phone Number</label>
    						</div>
    						<div className="relative">
    							<input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full my-4 border-b-2 bg-slate-700 border-slate-950 text-gray-200 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
    							<label htmlFor="email" className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Email Address</label>
    						</div>
    						<div className="relative">
    							<input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent my-4 h-10 w-full bg-slate-700 border-b-2 border-slate-950 text-gray-200 focus:outline-none focus:borer-rose-600" placeholder="Password" /><div className='inline-block cursor-pointer absolute top-4 right-0' onClick={handlePasswordHide}>{isHidePassword?<ClosedEyeIcon/>:<OpenEyeIcon></OpenEyeIcon>}</div>
    							<label htmlFor="password" className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Password</label>
    						</div>
    						<div className="relative">
    							<button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-2 py-1 my-4">Signup</button>
    						</div>
							</form>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
</section>
}
    </>
  )
}

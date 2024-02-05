import React from 'react'

export default function SignUp() {
  return (
    <>
    <section className="text-gray-400 bg-gray-900 body-font">
    <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
    	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
    		<div
    			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    		</div>
    		<div className="relative px-4 py-10 bg-slate-700 shadow-lg sm:rounded-3xl sm:p-20">
    			<div className="max-w-md mx-auto">
    				<div>
    					<h1 className="text-2xl font-semibold text-white">Signup</h1>
              <p>Please fill in the form to create an account</p>
    				</div>
    				<div className="divide-y divide-gray-200">
    					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative flex">
    						<div className=" relative w-1/2">
    							<input autocomplete="off" id="firstName" name="firstName" type="text" className="peer placeholder-transparent h-10 w-3/4 border-b-2 bg-slate-700 border-slate-950 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="First Name" />
    							<label for="firstName" className="absolute left-0 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">First Name</label>
    						</div>
    						<div className="relative w-1/2">
    							<input autocomplete="off" id="lastName" name="lastName" type="text" className="peer placeholder-transparent h-10 w-3/4 border-b-2 bg-slate-700 border-slate-950 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Last Name" />
    							<label for="lastName" className="absolute left-0 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Last Name</label>
    						</div>
                </div>
    						<div className="relative">
    							<input autocomplete="off" id="phone" name="phone" type="number" className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-slate-950 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Mobile Number" />
    							<label for="phone" className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Phone Number</label>
    						</div>
    						<div className="relative">
    							<input autocomplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 bg-slate-700 border-slate-950 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
    							<label for="email" className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Email Address</label>
    						</div>
    						<div className="relative">
    							<input autocomplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full bg-slate-700 border-b-2 border-gray-950 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
    							<label for="password" className="absolute left-0 -top-3.5  text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-200 peer-focus:text-sm">Password</label>
    						</div>
    						<div className="relative">
    							<button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-2 py-1">Submit</button>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    </section>
    </>
  )
}

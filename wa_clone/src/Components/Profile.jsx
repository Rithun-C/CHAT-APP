import { ArrowLeft, CheckIcon, Edit2Icon, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase.config';


function Profile(props) {
    const {userData,setuserData,updateName,updateStatus,updatePhoto,isUploading,error} = useAuth();
    const [name,setName] = useState(userData?.name || "")
    const [status,setStatus] = useState(userData?.status || "")
    
    const handleLogout = async() =>{
        await signOut(auth);
        setuserData(null);
        Navigate("/login");
    }
    
  return (
    <div className='w-[25vw] bg-white'>
    <div className='bg-primary text-white flex gap-8 text-lg items-center'>
        <button
        onClick={props.onBack}>
        <ArrowLeft/>

        </button>
        <div>Profile</div>
    </div>
    <div className='flex flex-col gap-8 justify-center items-center'>
      <label className={` group relative cursor-pointer rounded-full overflow-hidden ${isUploading? "pointer-events-none" : ""}`}>
        <img src={userData?.profile_pic} alt="" className='h-30 w-30  mt-20 mb-24 object-cover'/>
        <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={(e) => {
                updatePhoto(e.target.files?.[0]);
            }}/>
                      {isUploading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
                            <Loader2Icon className="w-6 h-6 text-primaryDense animate-spin z-10" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/30 z-10">
                            <Edit2Icon className="w-6 h-6 text-white" />
                        </div>
                    )}
      </label>
      {!error && <p className='text-red-600 text-sm'>{error}</p>}

        <div className='flex flex-col bg-white w-full px-8 py-4'>
              <label htmlFor="" className='text-primaryDense text-sm mb-2'>Your Name</label>
              <div className='flex items-center w-full'>
              <input type="text" className='w-full bg-transparent' placeholder='Update Your Name...' value={name} onChange={(e)=>{setName(e.target.value)}}/>  
              <button onClick={()=>updateName(name)}> <CheckIcon className='w-5 h-5'/></button>            
        </div>
        </div>
        <div className='flex flex-col bg-white w-full px-8 py-4'>
              <label htmlFor="" className='text-primaryDense text-sm mb-2'>Your Status</label>
              <div className='flex items-center w-full'>
              <input type="text" className='w-full bg-transparent' placeholder='Update Your Status...' value={status} onChange={(e)=>{setStatus(e.target.value)}}/>  
              <button onClick={()=>updateStatus(status)}> <CheckIcon className='w-5 h-5'/></button>            
        </div>
        </div>
        <button onClick={handleLogout} className='bg-primary text-white rounded-md p-2 hover:bg-primaryDense'>Logout</button>
    </div>
    </div>
  )
}

export default Profile
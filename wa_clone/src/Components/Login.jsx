import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth,db } from '../../firebase.config';
import { LogIn,Fingerprint } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';


async function createUser(result){
  const authdata = result.user;
  const {displayName,uid,photoURL,email}=authdata;
  const date = new Date();
  const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  await setDoc(doc(db,'user',uid),{
    email,
    name:displayName,
    profile_pic:photoURL,
    lastseen:timeStamp
  })
}
function Login() {
  const navigate = useNavigate();
  const handleLogin = async() =>{
    const userData = await signInWithPopup(auth,new GoogleAuthProvider);
    await createUser(userData);
    navigate("/");
  }
  return (
      <>
      <div  className='h-[180px] bg-primary'>
        <div className='flex ml-[200px] pt-[40px] items-center gap-4'>
          <img src="https://whatsapp-clone-826a9.web.app/whatsapp.svg" alt="" className='h-8' />
          <div className='text-white font-medium'>WHATSAPP</div>
        </div>
      </div>
    <div className='bg-[#eff2f5] h-[calc(100vh-180px)] flex justify-center items-center relative'>
      <div className='h-[100%] w-[80%] bg-white shadow-2xl flex flex-col gap-4 justify-center items-center absolute -top-[75px] rounded-md'>
        <Fingerprint className='h-16 w-16 text-primary' strokeWidth={1}/>
        <div className='text-black font-semibold '>Sign In</div>
        <div>Sign in with your google account to get started.</div>
        <button onClick={handleLogin} className='flex gap-4 items-center text-white bg-primary rounded-md p-3'>
          <div>
              Sign in with google 
          </div>
          <LogIn/> 
        </button>
      </div>
    </div>
    </>
  )
}

export default Login
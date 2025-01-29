import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth ,storage} from '../../firebase.config';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { signOut } from 'firebase/auth';
import ChatPanel from './ChatPanel';
import ChatWindow from './ChatWindow';
function Home(props) {
    // const handlechange=(e)=>{
    //     const img = e.target.files[0];
    //     const strref = ref(storage,"/profile");
    //     const uploadTask = uploadBytesResumable(strref,img);
    //     uploadTask.on("state_changed",progressCB,errorCB,finisgCB);
    //     function progressCB(data){
    //         console.log(data);
    //     }
    //     function errorCB(err){
    //         console.log(err);
    //     }
    //     function finisgCB(){
    //         console.log("successfull");
    //         getDownloadURL(uploadTask.snapshot.ref).then(function (url){
    //             console.log(url)
    //         })
    //     }
    // }
    return (
    <main className='h-screen bg-slate-100'>
        {/* <input type="file"accept='image/png image/jpeg image/webp' onChange={handlechange} /> */}
        <div className='bg-slate-300 w-full h-screen shadow-md flex'>
        <ChatPanel></ChatPanel>
        <ChatWindow></ChatWindow>
        </div>
        
    </main>
  )
}
export default Home
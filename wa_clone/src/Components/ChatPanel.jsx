import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import { EllipsisVertical, MessageSquare, Sun, UserRound } from 'lucide-react';
import Profile from './Profile';
import UserCard from './UserCard';
import { useAuth } from './AuthContext';

function ChatPanel() {
    const [Users,setUsers] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [showProfile,setshowProfile] = useState(false);
    const {userData} = useAuth();

    useEffect(()=>{
        const getUsers = async ()=>{
            const SnapShot = await getDocs(collection(db,'user'));
            const arrofUsers = SnapShot.docs.map((docs)=>{return {userData:docs.data(), id : docs.id}});
            setUsers(arrofUsers);
            setLoading(false);
        };
        getUsers();
    },[]);

    const onBack = ()=>{setshowProfile(false)};

    if (showProfile){
        return <Profile onBack={onBack}/>
    }

  return (
    <div className='w-[25vw]  bg-white'>
    <div className='bg-backgroung flex py-2 px-4 border-r justify-between items-center gap-2'>
        <div className=''>
            <button onClick={()=>{setshowProfile(true)}}><img src={userData?.profile_pic || "/profile.jpeg"} alt="" className='h-10 w-10 rounded-full object-cover'/></button>
        </div>
        <div className='flex gap-4  mx-4'>
        <Sun />
        <UserRound />
        <MessageSquare />
        <EllipsisVertical />
        </div>
    </div>
    {
        isLoading ? <h2>....Loading</h2>:
    <div className='flex flex-col '>
        {Users.map(userObject =>(
            <UserCard userObject={userObject} />
        ))}
    </div>
}
    </div>

  )
}

export default ChatPanel
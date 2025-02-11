import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase.config';
import { useAuth } from './AuthContext';
import { useRef } from 'react';  // Add this


function ChatWindow() {
  const chatContainerRef = useRef(null);
  const params = useParams();
  const [msg, setmsg] = useState("");
  const [secondUser, setsecondUser] = useState({});
  const receiverId = params.chatid;
  const [msgList, setMsgList] = useState([]);
  const { userData } = useAuth();

  const chatId = userData?.id > receiverId ? `${userData.id}-${receiverId}`
    : `${receiverId}-${userData?.id}`;

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, 'user', receiverId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data())
        setsecondUser(docSnap.data());
      }
    }
    const msgUnsubscribe = onSnapshot(doc(db, "user-chats", chatId), (doc) => {
      setMsgList(doc.data()?.messages || []);
    });

    getUser();

    return () => {
      msgUnsubscribe();
    };
  }, [receiverId])
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [msgList]); 
  

  const handleSendMsg = async () => {
    if (msg) {
      const date = new Date();
      const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      if (msgList?.length === 0) {

        await setDoc(doc(db, "user-chats", chatId), {
          chatId: chatId,
          messages: [
            {
              text: msg,
              time: timeStamp,
              sender: userData.id,
              receiver: receiverId,
            },
          ],
        });
      } else {
        await updateDoc(doc(db, "user-chats", chatId), {
          chatId: chatId,
          // arrayUnion is used here to append to last message to the array list.
          messages: arrayUnion({
            text: msg,
            time: timeStamp,
            sender: userData.id,
            receiver: receiverId,
          }),
        });
      }
      setmsg("")
    }
  }

  if (!receiverId) {
    return (
      <section className='w-[75%] h-full flex flex-col gap-4 items-center justify-center bg-backgroung'>
        <MessageSquareText className='w-28 h-28 text-gray-400'
          strokeWidth={1.2} />
        <p className='text-sm text-center text-gray-400'>
          select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    )
  }
  return (
    <div className='w-[75%] h-full flex flex-col'>
      <div className='flex bg-backgroung items-center py-2 px-4 gap-3 shadow-sm'>
        <img src={secondUser.profile_pic || "profile.jpeg"} alt="" className='h-8 w-8 rounded-full object-cover' />
        <div>
          <h3>{secondUser.name}</h3>
          {secondUser?.lastseen && (
            <p className='text-xs text-neutral-400'>
              last seen : {secondUser.lastseen}
            </p>
          )}
        </div>

      </div>
      <div ref={chatContainerRef} className="flex-grow flex flex-col gap-12 p-6 overflow-y-scroll bg-yellow-50">
        {/* chat messages */}
        {/*... */}

        {msgList?.map((m, index) => (
          <div
            key={index}
            data-sender={m.sender === userData.id}
            // break-words is the edge case where a single word is quite long, so we need to break that word before it breaks our ui.
            className={`bg-white  w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-green-300`}
          >
            <p>{m?.text}</p>
            <p className="text-xs text-neutral-500  text-end">
              {m?.time}
            </p>
          </div>
        ))}
      </div>
      <div className=' bg-backgroung flex items-center p-2 gap-4 shadow'>
        <PlusIcon />
        <input type="text" name="" id="" placeholder='Type Message...' className='w-full py-2 px-4 rounded focus:outline-none' value={msg}
          onChange={(e) => {
            setmsg(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMsg();
            }
          }}
        />
        <button onClick={handleSendMsg} ><SendIcon /></button>
      </div>
    </div>
  )
}

export default ChatWindow
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [userData, setuserData] = useState(null);
  const [loading, setloading] = useState(true);
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setloading(true)
      if (currentUser) {
        const docRef = doc(db, 'user', currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { name, profile_pic, email, lastseen, status } = docSnap.data();
          await setLastseen(currentUser);
          setuserData({
            id: currentUser.uid,
            profile_pic,
            name,
            email,
            lastseen,
            status: status ? status : ""
          });
        }
      }
      setloading(false)
    })
    return () => {
      unsubscribe();
    }
  }, [])

  const setLastseen = async (user) => {
    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    await updateDoc(doc(db, "user", user.uid), {
      lastseen: timeStamp,
    });
  }

  const updateName = async (newName) => {
    await updateDoc(doc(db, "user", userData.id), {
      name: newName
    });
  }

  const updateStatus = async (newStatus) => {
    await updateDoc(doc(db, "user", userData.id), {
      status: newStatus
    });
  }

  const updatePhoto = async (img) => {
    const storageRef = ref(storage, `profile/${userData.id}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      () => {
        // on State Changed
        setIsUploading(true);
        setError(null);
        console.log("upload started");
      },
      () => {
        // on Error
        setError("Unable to Upload!");
        alert("Unable to Upload!");
      },
      () => {
        // on Success
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "users", userData.id), {
            profile_pic: downloadURL,
          });
          setuserData({
            ...userData,
            profile_pic: downloadURL,
          });
          setIsUploading(false);
          setError(null);
        });
      }
    );
  };


  return <AuthContext.Provider value={{ userData, setuserData, loading, updateName, updateStatus, updatePhoto, isUploading, error }}>
    {children}
  </AuthContext.Provider>

}

export default AuthWrapper
import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from 'scenes/navbar'
import { Advertisement } from 'widgets/Advertisement'
import FriendListWidget from 'widgets/FriendListWidget'
import MyPostWidget from 'widgets/MyPostWidget.jsx'
import UserWidget from 'widgets/UserWidget'

const HomePage = () => {

  const { _id, picturePath } = useSelector((state:any) => state.user);
  
  return (
    <><Navbar />
    <div>homePage</div>
    <Advertisement />
    <UserWidget userId={_id} picturePath={picturePath} />
    <FriendListWidget userId={_id} />
    <MyPostWidget picturePath={picturePath}/>
    </>
  )
}

export default HomePage
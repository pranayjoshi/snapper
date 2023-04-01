import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from 'scenes/navbar'
import { Advertisement } from 'widgets/Advertisement'
import FriendListWidget from 'widgets/FriendListWidget'
import MyPostWidget from 'widgets/MyPostWidget.jsx'
import PostsWidget from 'widgets/PostsWidget'
import UserWidget from 'widgets/UserWidget'

const HomePage = () => {

  const { _id, picturePath } = useSelector((state:any) => state.user);
  
  return (
    <><div>
      <Navbar />
      <div className='w-full p-8 block lg:flex justify-between'
      >
        <div className='hidden lg:w-3/12 lg:block'>
        <UserWidget userId={_id} picturePath={picturePath} />
      </div>
      <div className='hidden lg:w-5/12 lg:block p-8 lg:p-0'>
      <MyPostWidget picturePath={picturePath} /></div>
      <PostsWidget userId={_id} />
    
    <div className='hidden lg:w-3/12 lg:block'>
        <Advertisement />
        <div className='p-8'></div>
        <FriendListWidget userId={_id} />
    </div>
    </div>
    </div>
    </>
  )
}

export default HomePage
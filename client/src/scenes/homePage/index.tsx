import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from 'scenes/navbar'
import { Advertisement } from 'widgets/Advertisement'
import UserWidget from 'widgets/UserWidget'

const HomePage = () => {

  const { _id, picturePath } = useSelector((state:any) => state.user);
  
  return (
    <><Navbar />
    <div>homePage</div>
    <Advertisement />
    <UserWidget userId={_id} picturePath={picturePath} />
    </>
  )
}

export default HomePage
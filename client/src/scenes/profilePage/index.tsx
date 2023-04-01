import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "scenes/navbar";
import FriendListWidget from "widgets/FriendListWidget";
import MyPostWidget from "widgets/MyPostWidget";
import PostsWidget from "widgets/PostsWidget";
import UserWidget from "widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state:any) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div>
      <Navbar />
      <div className="w-full p-8 gap-8 justify-center lg:flex block">
        <div className=" lg:block hidden lg:w-3/12">
          <UserWidget userId={userId as string} picturePath={user["picturePath"]} />
          <div className="m-8" />
          <FriendListWidget userId={userId as string} />
        </div>
        <div className="lg:block  lg:w-5/12 lg:m-0">
          <div className="block lg:hidden"><UserWidget userId={userId as string} picturePath={user["picturePath"]} /></div>
          <div className="m-8 lg:m-0" />
          <PostsWidget userId={userId as string} isProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
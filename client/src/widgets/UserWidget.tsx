import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage";

import {MapPin, Briefcase} from "@styled-icons/heroicons-outline/";


interface Props {
  userId: string;
  picturePath: string;
}

const UserWidget = ({userId, picturePath}:Props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);

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

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <div className="border rounded-lg divide-y ">
      <div onClick={() => navigate(`/profile/${userId}`)} className="flex">
        <UserImage image={picturePath} />
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div >
        <div className="flex">
          <MapPin className="w-6" />
          <p className="text-gray-400">{location}</p>
        </div>
        <div className="items-center flex">
          <Briefcase className="w-6" />
          <p className="text-gray-400">{occupation}</p>
        </div>
      </div>
      <div >
        <div className="flex">
          <p className="text-gray-400">Who's viewed your profile</p>
          <div className="text-gray-700 dark:text-gray-200" >
            {viewedProfile}
          </div>
        </div>
        <div className="flex">
          <p className="text-gray-400">Who's viewed your profile</p>
          <div className="text-gray-700 dark:text-gray-200" >
            {impressions}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserWidget;
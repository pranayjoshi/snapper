import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImage from "components/UserImage";

import {MapPin, Briefcase, Cog6Tooth} from "@styled-icons/heroicons-outline/";


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
        <div className="py-2 pl-2"><UserImage image={picturePath} /></div>
        <div>
        <p className="px-2 pt-4 text-gray-700 text-sm">
          {firstName} {lastName}
        </p>
        <p className="text-gray-400 px-2 text-xs">{friends["length"]} friends</p>
        </div>
        <Cog6Tooth className="w-6 ml-12"/>
      </div>
      <div >
        <div className="flex m-2">
          <MapPin className="w-8 pr-2" />
          <p className="text-gray-400">{location}</p>
        </div>
        <div className="items-center flex m-2">
          <Briefcase className="w-8 pr-2" />
          <p className="text-gray-400">{occupation}</p>
        </div>
        
      </div>
      <div >
        <div className="flow-root m-2">
          <p className="text-gray-400 text-sm float-left">Who's viewed your profile:</p>
          <div className="text-gray-700 dark:text-gray-200 text-sm float-right" >
            {viewedProfile}
          </div>
        </div>
        <div className="flow-root m-2">
          <p className="text-gray-400 text-sm float-left">Who's viewed your profile:</p>
          <div className="text-gray-700 dark:text-gray-200 text-sm float-right" >
            {impressions}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserWidget;
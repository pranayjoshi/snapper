import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import UserImage from "./UserImage";
import {UserPlus, UserMinus} from "@styled-icons/heroicons-outline";

interface Props{
    friendId: string, name:string, subtitle:string, userPicturePath:string
}

const Friend = ({ friendId, name, subtitle, userPicturePath }:Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state:any) => state.user);
  const token = useSelector((state:any) => state.token);
  const friends = useSelector((state:any) => state.user.friends);

  const isFriend = friends.find((friend:any) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data)
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="flex justify-between m-2">
      <div className="flex gap-4">
        <UserImage image={userPicturePath}/>
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <p
            className="text-gray-700 dark:text-gray-200 cursor-pointer text-sm"
          >
            {name}
          </p>
          <p className="text-gray-400 text-sm">
            {subtitle}
          </p>
        </div>
      </div>
      <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => patchFriend()}>
        {isFriend ? (
          <UserMinus className="text-gray-700 dark:text-gray-200 w-6" />
        ) : (
          <UserPlus className="text-gray-700 dark:text-gray-200 w-6" />
        )}
      </button>
    </div>
  );
};

export default Friend;
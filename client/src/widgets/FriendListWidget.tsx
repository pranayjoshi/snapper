import Friend from "components/Friend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

interface Props {
    userId: string
}

const FriendListWidget = ({ userId }:Props) => {
  const dispatch = useDispatch();
  const token = useSelector((state:any) => state.token);
  const friends = useSelector((state:any) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-2 rounded-lg shadow-lg border" >
      <p
        className="text-gray-700 dark:text-gray-200"
      >
        Friend List
      </p>
      <div className="divide-y flex flex-col ">
        {friends.map((friend:any) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath} 
          />
        ))}
      </div>
    </div>
  );
};

export default FriendListWidget;
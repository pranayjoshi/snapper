  import { ChatBubbleLeftEllipsis, Share} from "@styled-icons/heroicons-outline";
  import { Heart } from "@styled-icons/ionicons-outline";
  import { Heart as HeartFilled } from "@styled-icons/ionicons-solid";
  import Friend from "components/Friend";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  
  interface Props{
    postId:string,
    postUserId:string,
    name:string,
    description:string,
    location:string,
    picturePath:string,
    userPicturePath:string,
    likes:any,
    comments:Array<String>,
  }


  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }:Props) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state:any) => state.token);
    const loggedInUserId = useSelector((state:any) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = 10;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    return (
      <div className="my-8 rounded-lg divide-y border shadow-lg p-2">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <p className="mt-4 text-gray-700 dark:text-gray-200">
          {description}
        </p>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <div className="mt-1 flex">
          <div className="gap-4 flex">
            <div className="flex gap-1">
              <button onClick={patchLike}>
                {isLiked ? (
                  <HeartFilled className="text-blue-400 w-6" />
                ) : (
                  <Heart className="text-blue-400 w-6"/>
                )}
              </button>
              <p className="text-gray-700 dark:text-gray-200">{likeCount}</p>
            </div>
  
            <div className="flex gap-1">
              <button onClick={() => setIsComments(!isComments)}>
                <ChatBubbleLeftEllipsis className="text-gray-700 dark:text-gray-200 w-6" />
              </button>
              <p className="text-gray-700 dark:text-gray-200">10</p>
            </div>
          </div>
  
          <button>
            <Share />
          </button>
        </div>
        {isComments && (
          <div className="m-2">
            {comments.map((comment:String, i:number) => (
              <div key={`${name}-${i}`} className="divide-y">
                <p  className="p-4 m-2 text-gray-700 dark:text-gray-200">
                  {comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default PostWidget;
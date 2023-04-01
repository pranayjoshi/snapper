

import {
    Pencil,
    Trash,
    PaperClip,
    Gift,
    Photo,
    Microphone,
    EllipsisHorizontalCircle,
  } from "@styled-icons/heroicons-outline/";
import {
    Create
} from "@styled-icons/ionicons-outline";

  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";

  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
  
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    };
  
    return (
      <div className="rounded-lg divide-y border shadow-lg p-2">
        <div className="flex mb-4" >
          <div className="h-20 w-20"><UserImage image={picturePath} /></div>
          
          <textarea id="message" rows="4" onChange={(e) => setPost(e.target.value)} value={post}
          className="block  w-full text-sm p-2 text-gray-700 dark:text-gray-200 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        {isImage && (
          <div className="border">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex">
                  <div
                  className="border-2 p-4 m-2 border-dashed cursor-pointer text-gray-700 dark:text-gray-200" {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <div className="w-full">
                        <p>{image.name}</p>
                        <Pencil />
                      </div>
                    )}
                  </div>
                  {image && (
                    <button
                      onClick={() => setImage(null)}
                    >
                      <Trash className="w-6 h-6"/>
                    </button>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        )}
        
        <div className="p-4 flex gap-4">
          <div className="flex" onClick={() => setIsImage(!isImage)}>
            <Photo className="text-gray-700 dark:text-gray-200  w-5 h-5" />
            <p
              className="text-gray-500 cursor-pointer text-sm"
            >
              Image
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="flex gap-4">
              <div className="flex">
                <Gift className="text-gray-700 dark:text-gray-200 w-5 h-5" />
                <p className="text-gray-700 dark:text-gray-200 text-sm">Clip</p>
              </div>
  
              <div className="flex">
                <PaperClip className="text-gray-700 dark:text-gray-200 w-5 h-5" />
                <p className="text-gray-700 dark:text-gray-200 text-sm">Attach</p>
              </div>
  
              <div className="flex">
                <Microphone className="text-gray-700 dark:text-gray-200 w-5 h-5" />
                <p className="text-gray-700 dark:text-gray-200 text-sm">Audio</p>
              </div>
            </div>
          </div>
          <div className="lg:hidden block">
            <div><EllipsisHorizontalCircle className="text-gray-400 w-5 h-5" /></div>
          </div>
  
          <button
            disabled={!post}
            onClick={handlePost}
            
          >
            <div className="flex bg-blue-400 px-4 py-2 rounded-full ">
            <Create className= " text-white dark:text-gray-200 w-5 h-5"/>
            <span className="text-white text-sm dark:text-gray-200">Post</span></div>
          </button>
        </div>
      </div>
    );
  };
  
  export default MyPostWidget;
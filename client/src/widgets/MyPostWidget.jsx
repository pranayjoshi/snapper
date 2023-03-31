

import {
    Pencil,
    Trash,
    PaperClip,
    Gift,
    Photo,
    Microphone,
    EllipsisHorizontalCircle,
    Gif,
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
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
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
      <div className="rounded-lg divide-y">
        <div className="flex" >
          <UserImage image={picturePath} />
          <input
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            className="text-gray-700 dark:text-gray-200"
          />
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
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <div>
                        <p>{image.name}</p>
                        <EditOutlined />
                      </div>
                    )}
                  </div>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        )}
  
        <div className="flex">
        <div className="flex" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </div>
  
          <div className="hidden lg:block">
            <>
              <div className="flex">
                <Gift sx={{ color: mediumMain }} />
                <p color={mediumMain}>Clip</p>
              </div>
  
              <div className="flex">
                <PaperClip sx={{ color: mediumMain }} />
                <p color={mediumMain}>Attachment</p>
              </div>
  
              <div className="flex">
                <MicOutlined sx={{ color: mediumMain }} />
                <p color={mediumMain}>Audio</p>
              </div>
            </>
          </div>
          <div className="lg:hidden block">
            <EllipsisHorizontalCircle className="text-gray-400" />
          </div>
  
          <button
            disabled={!post}
            onClick={handlePost}
            className="flex"
          >
            <Create />
            <span>Post</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default MyPostWidget;
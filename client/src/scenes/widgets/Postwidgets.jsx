import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/widgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

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
}) => 

{
  
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isLiked, setIsLiked] = useState(
    Boolean(likes[loggedInUserId]) === true ? true : false
  );
  //   const loggedInUserId = useSelector((state) => state.user ? state.user._id : null);
  // const isLiked = loggedInUserId && Boolean(likes[loggedInUserId]);

  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();

  const main = palette.secondary.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await response.json();
    await dispatch(setPost(updatedPost)); //if there is no change in the post meanws like or comments are same as before then it will return same post otherwise it will refresh the post with updates
    setIsLiked(Boolean(updatedPost.likes[loggedInUserId]));
  };
  const [comm, setComm] = useState("");
  const hanldeSubmit = (e) => {
    e.preventDefault();

  };
  return (
    <WidgetWrapper margin="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath[0] ? userPicturePath[0] :[]}
        
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1.25rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* Comment section */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <form onSubmit={hanldeSubmit}>
        {isComments && (
          <>
            <input
              type="text"
              value={comm}
              onChange={(e) => setComm(e.target.value)}
            />
            <button>Comment</button>
          </>
        )}
      </form>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

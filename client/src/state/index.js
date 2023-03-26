import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode == "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends doesnot exist!");
      }
    },
    setPosts: (state, action) => {
      state.user.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload.post;
        return post;
      });
      state.user.posts = updatePosts;
    },
  },
});

export const { setMode, setLogout, setFriends, setLogin, setPost, setPosts } =
  authSlice.actions;

export default authSlice.reducer;

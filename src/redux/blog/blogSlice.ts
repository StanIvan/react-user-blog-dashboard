import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addBlogPost,
  BlogPost,
  deleteBlogPost,
  editBlogPost,
  getMembers,
} from "../../data/data";
import { RootState } from "../store";

export const fetchBlogPosts = createAsyncThunk<BlogPost[]>(
  "blogPosts/fetchBlogPosts",
  async () => getMembers(),
);

export const updateBlogPost = createAsyncThunk<
  BlogPost,
  { id: string; data: Omit<BlogPost, "id"> }
>("blog/updateBlogPost", async ({ id, data }) => editBlogPost(id, data));

export const removeBlogPost = createAsyncThunk<string, string>(
  "blog/removeBlogPost",
  async (id) => {
    await deleteBlogPost(id);
    return id;
  },
);

export const createBlogPost = createAsyncThunk<BlogPost, BlogPost>(
  "blog/createBlogPost",
  async (newPost) => addBlogPost(newPost),
);

export interface BlogPostsState {
  blogPosts: BlogPost[];
}

const initialState: BlogPostsState = {
  blogPosts: [],
};

const blogSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogPosts.fulfilled, (state, action) => ({
      ...state,
      blogPosts: [...action.payload],
    }));
    builder.addCase(updateBlogPost.fulfilled, (state, { payload }) => {
      const index = state.blogPosts.findIndex((post) => post.id === payload.id);
      if (index !== -1) {
        return {
          ...state,
          blogPosts: [
            ...state.blogPosts.slice(0, index),
            payload,
            ...state.blogPosts.slice(index + 1),
          ],
        };
      }
      return state;
    });
    builder.addCase(removeBlogPost.fulfilled, (state, { payload }) => ({
      ...state,
      blogPosts: state.blogPosts.filter((post) => post.id !== payload),
    }));
    builder.addCase(createBlogPost.fulfilled, (state, { payload }) => ({
      ...state,
      blogPosts: [payload, ...state.blogPosts],
    }));
  },
});

export default blogSlice.reducer;
export const selectBlogPosts = (state: RootState) => state.blog.blogPosts;

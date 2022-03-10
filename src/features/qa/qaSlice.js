import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sortPosts, asyncPost } from "./utilities";

const initialState = {
  isAsync: false,
  posts: [
    {
      id: "1",
      question: "Can i add my own questions?",
      answer: "Yes, Of course!",
    },
    {
      id: "2",
      question: "How to add a question",
      answer: "Just use the form below",
    },
  ],
  err: null,
  status: "idle",
};

export const addNewPostDelay = createAsyncThunk(
  "qa/addNewPostDelay",
  async (value) => {
    const response = await asyncPost(value);
    return response.data;
  }
);
const qaSlice = createSlice({
  name: "qa",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(question, answer) {
        return {
          payload: {
            id: nanoid(),
            question,
            answer,
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, question, answer } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.question = question;
        existingPost.answer = answer;
      }
    },
    postDeletedAll(state) {
      state.posts.length = 0;
    },
    postDeleted(state, action) {
      const index = state.posts.findIndex((post) => post.id === action.payload);
      state.posts = [
        ...state.posts.slice(0, index),
        ...state.posts.slice(index + 1),
      ];
    },
    postSorted(state) {
      state.posts = [...sortPosts(state.posts)];
    },
    postIsAsync(state, action) {
      state.isAsync = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addNewPostDelay.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export const {
  postAdded,
  postUpdated,
  postDeletedAll,
  postDeleted,
  postSorted,
  postIsAsync,
} = qaSlice.actions;
export default qaSlice.reducer;
